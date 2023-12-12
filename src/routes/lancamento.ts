import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)
interface RelatorioQuery {
  status: string
  data_inicial: string
  data_final: string
}
export async function lancamentoRoutes(app: FastifyInstance) {
  app.get('/', async (request) => {
    try {
      const lancamentos = await knex('lancamento').select()
      return { lancamentos }
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao buscar lançamentos.' }
    }
  })
  app.get('/historico', async (request) => {
    try {
      const query = request.query as RelatorioQuery
      const dataInicial = dayjs(query.data_inicial, 'YYYY/MM/DD').format()
      const dataFinal = dayjs(query.data_final, 'YYYY/MM/DD').format()
      const lancamentos = await knex('lancamento')
        .modify(function (queryBuilder) {
          if (query.data_inicial) {
            queryBuilder.where('data_vencimento', '>=', dataInicial)
          }

          if (query.data_final) {
            queryBuilder.andWhere('data_vencimento', '<', dataFinal)
          }

          if (query.status) {
            queryBuilder.andWhere({
              status: query.status,
            })
          }
        })
        .select()
      return { lancamentos }
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao buscar lançamentos.' }
    }
  })

  app.post('/', async (request, reply) => {
    const createPermissaoBodySchema = z.object({
      nome: z.string(),
    })

    try {
      const { nome } = createPermissaoBodySchema.parse(request.body)

      const id = randomUUID()

      await knex('permissao').insert({
        id,
        nome,
      })
      return reply
        .status(201)
        .send({ message: 'Permissão cadastrada com sucesso!' })
    } catch (error) {
      console.error(error)
      return reply.status(400).send({ message: 'Erro ao cadastrar permissão.' })
    }
  })

  // Rota para atualizar permissão por ID (PUT)
  app.put(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const updatePermissaoParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const updatePermissaoBodySchema = z.object({
        nome: z.string(),
      })

      try {
        const { id } = updatePermissaoParamsSchema.parse(request.params)
        const { nome } = updatePermissaoBodySchema.parse(request.body)

        // Verifica se o ID existe antes de atualizar
        const permissao = await knex('permissao').where({ id }).first()

        if (!permissao) {
          return reply.status(404).send('Permissão não encontrada.')
        }

        await knex('permissao').where({ id }).update({
          nome,
        })

        return reply.status(204).send()
      } catch (error) {
        console.error(error)
        return reply.status(500).send('Erro ao atualizar a permissão.')
      }
    },
  )

  // Rota para excluir permissão por ID (DELETE)
  app.delete(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const deletePermissaoParamsSchema = z.object({
        id: z.string().uuid(),
      })

      try {
        const { id } = deletePermissaoParamsSchema.parse(request.params)

        // Verifica se o ID existe antes de excluir
        const permissao = await knex('permissao').where({ id }).first()

        if (!permissao) {
          return reply.status(404).send('Permissão não encontrada.')
        }

        await knex('permissao').where({ id }).del()

        return reply.status(204).send()
      } catch (error) {
        console.error(error)
        return reply.status(500).send('Erro ao excluir a permissão.')
      }
    },
  )
}
