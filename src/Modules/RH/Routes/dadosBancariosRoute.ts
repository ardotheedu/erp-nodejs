import { FastifyInstance } from 'fastify'
import {
  all,
  create,
  getById,
  remove,
  update,
} from '../Repositories/dadosBancariosRepository'
import { z } from 'zod'
import { dadosBancarios } from '../Entities/dadosBancarios'

export async function dadosBancariosRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    try {
      const dadosBancarios = await all()
      return reply.status(201).send(dadosBancarios)
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao obter usuários' }
    }
  })

  app.get('/:id', async (request, reply) => {
    try {
      const getLancamentoParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getLancamentoParamsSchema.parse(request.params)
      const dadosBancarios = await getById(id)
      return reply.status(201).send(dadosBancarios)
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao obter usuários' }
    }
  })

  app.post('/', async (request, reply) => {
    try {
      const createFuncionarioBodySchema = z.object({
        id_funcionario: z.string(),
        nome_banco: z.string(),
        agencia: z.string(),
        conta: z.string(),
        tipo: z.string(),
        pix: z.string(),
      })

      const { id_funcionario, nome_banco, agencia, conta, tipo, pix } =
        createFuncionarioBodySchema.parse(request.body)

      const dadosBancarios: dadosBancarios = {
        id_funcionario,
        nome_banco,
        agencia,
        conta,
        tipo,
        pix,
      }

      await create(dadosBancarios)
      return reply.status(201).send(dadosBancarios)
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao criar o usuário' }
    }
  })

  app.put('/:id', async (request, reply) => {
    try {
      const updateFuncionarioBodySchema = z.object({
        id: z.string().uuid(),
        id_funcionario: z.string(),
        nome_banco: z.string(),
        agencia: z.string(),
        conta: z.string(),
        tipo: z.string(),
        pix: z.string(),
      })

      const { id, id_funcionario, nome_banco, agencia, conta, tipo, pix } =
        updateFuncionarioBodySchema.parse(request.body)

      const dadosBancarios: dadosBancarios = {
        id,
        id_funcionario,
        nome_banco,
        agencia,
        conta,
        tipo,
        pix,
      }

      await update(dadosBancarios)
      return reply.status(201).send()
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao atualizar o usuário' }
    }
  })

  app.delete('/:id', async (request, reply) => {
    try {
      const getLancamentoParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getLancamentoParamsSchema.parse(request.params)
      await remove(id)
      return reply.status(201).send()
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao deletar o usuário' }
    }
  })
}
