import { FastifyInstance } from 'fastify'
import {
  all,
  create,
  getById,
  update,
  remove,
  getContracheque,
} from '../Repositories/contraChequeRepository'
import { z } from 'zod'
import { contraCheque } from '../Entities/contraCheque'
import dayjs from 'dayjs'

export async function contraChequeRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    try {
      const contraCheque = await getContracheque(request.query)
      return reply.status(201).send(contraCheque)
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao obter usuários' }
    }
  })

  app.get('/historico', async (request, reply) => {
    try {
      const contraChequeFuncionario = await getContracheque(request.query)
      console.log(contraChequeFuncionario)
      return reply.status(201).send(contraChequeFuncionario)
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao buscar lançamentos.' }
    }
  })

  app.get('/:id', async (request, reply) => {
    try {
      const getLancamentoParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getLancamentoParamsSchema.parse(request.params)
      const contraCheque = await getById(id)
      return reply.status(201).send(contraCheque)
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao obter usuários' }
    }
  })

  app.post('/', async (request, reply) => {
    try {
      const createFuncionarioBodySchema = z.object({
        id_funcionario: z.string(),
        remuneracao_principal: z.number(),
        comissao: z.number(),
        imposto: z.number(),
      })

      const { id_funcionario, remuneracao_principal, comissao, imposto } =
        createFuncionarioBodySchema.parse(request.body)

      const contraCheque: contraCheque = {
        id_funcionario,
        remuneracao_principal,
        comissao,
        imposto,
      }

      await create(contraCheque)
      return reply.status(201).send()
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
        remuneracao_principal: z.number(),
        comissao: z.number(),
        imposto: z.number(),
      })

      const { id, id_funcionario, remuneracao_principal, comissao, imposto } =
        updateFuncionarioBodySchema.parse(request.body)

      const contraCheque: contraCheque = {
        id,
        id_funcionario,
        remuneracao_principal,
        comissao,
        imposto,
      }

      await update(contraCheque)
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
      return { error: 'Erro ao obter usuários' }
    }
  })
}
