import { FastifyInstance } from 'fastify'
import {
  all,
  create,
  darEntrada,
  getById,
  registrarSaida,
  relatorioEntrada,
  relatorioSaida,
  remove,
  update,
} from '../Repositories/foodRepository'
import { z } from 'zod'
import dayjs from 'dayjs'
import { s } from 'vitest/dist/env-afee91f0'

export async function foodRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    try {
      const food = await all()
      return reply.status(201).send(food)
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao obter alimentos' }
    }
  })

  app.get('/:id', async (request, reply) => {
    try {
      const getLancamentoParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getLancamentoParamsSchema.parse(request.params)
      const food = await getById(id)
      return reply.status(201).send(food)
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao obter alimentos' }
    }
  })

  app.post('/criar', async (request, reply) => {
    try {
      const foodSchema = z.object({
        nome: z.string(),
        unidade_medida: z.string(),
      })

      const food = foodSchema.parse(request.body)
      await create(food)
      return reply.status(201).send({ message: 'Alimento criado com sucesso' })
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao criar alimento' }
    }
  })

  app.put('/:id', async (request, reply) => {
    try {
      const foodSchema = z.object({
        id: z.string().uuid(),
        nome: z.string(),
        unidade_medida: z.string(),
      })

      const food = foodSchema.parse(request.body)
      await update(food)
      return reply
        .status(201)
        .send({ message: 'Alimento atualizado com sucesso' })
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao atualizar alimento' }
    }
  })

  app.delete('/:id', async (request, reply) => {
    try {
      const getLancamentoParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getLancamentoParamsSchema.parse(request.params)
      await remove(id)
      return reply
        .status(201)
        .send({ message: 'Alimento deletado com sucesso' })
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao deletar alimento' }
    }
  })

  app.post('/entrada', async (request, reply) => {
    try {
      const entradaSchema = z.object({
        alimento_id: z.string().uuid(),
        quantidade: z.number(),
        data_entrada: z.string(),
        data_vencimento: z.string(),
      })

      const entrada = entradaSchema.parse(request.body)
      await darEntrada(entrada)
      return reply
        .status(201)
        .send({ message: 'Entrada registrada com sucesso' })
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao registrar entrada' }
    }
  })

  app.post('/saida', async (request, reply) => {
    try {
      const saidaSchema = z.object({
        alimento_id: z.string().uuid(),
        quantidade: z.number(),
        data_saida: z.coerce.date(),
      })

      const saida = saidaSchema.parse(request.body)
      await registrarSaida(saida)
      return reply.status(201).send({ message: 'Saída registrada com sucesso' })
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao registrar saída' }
    }
  })

  app.get('/relatorio/entrada', async (request, reply) => {
    try {
      const relatorioEntradaParamsSchema = z.object({
        data_inicial: z.coerce.date(),
        data_final: z.coerce.date(),
      })

      const { data_inicial, data_final } = relatorioEntradaParamsSchema.parse(
        request.query,
      )

      const relatorio = await relatorioEntrada({
        data_inicial: dayjs(data_inicial).format('YYYY-MM-DD'),
        data_final: dayjs(data_final).format('YYYY-MM-DD'),
      })

      return reply.status(201).send(relatorio)
    } catch (error) {
      console.log(error)
      return { error: 'Erro ao gerar relatório de entrada' }
    }
  })

  app.get('/relatorio/saida', async (request, reply) => {
    try {
      const relatorioSaidaParamsSchema = z.object({
        data_inicial: z.coerce.date(),
        data_final: z.coerce.date(),
      })

      const { data_inicial, data_final } = relatorioSaidaParamsSchema.parse(
        request.query,
      )
      const relatorio = await relatorioSaida({
        data_inicial: dayjs(data_inicial).format('YYYY-MM-DD'),
        data_final: dayjs(data_final).format('YYYY-MM-DD'),
      })

      return reply.status(201).send(relatorio)
    } catch (error) {
      console.log(error)
      return { error: 'Erro ao gerar relatório de saída' }
    }
  })
}
