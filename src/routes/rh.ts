import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function rhRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const rh = await knex('funcionario').select()

      return { rh }
    },
  )

  app.get(
    '/dados-bancarios',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const rh = await knex('dados_bancarios').select()

      return { rh }
    },
  )

  app.get(
    '/contra-cheque',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const rh = await knex('contra_cheque').select()

      return { rh }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const getrhParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getrhParamsSchema.parse(request.params)

      const { sessionId } = request.cookies

      const transaction = await knex('funcionario')
        .where({
          id,
        })
        .first()

      return {
        transaction,
      }
    },
  )

  app.post('/', async (request, reply) => {
    const createFuncionarioBodySchema = z.object({
      nome: z.string(),
      email: z.string(),
      senha: z.string(),
      telefone: z.string(),
      cargo: z.string(),
      salario: z.number(),
      data_contratacao: z.coerce.date(),
      papel_id: z.string(),
    })

    const {
      nome,
      email,
      senha,
      telefone,
      cargo,
      salario,
      data_contratacao,
      papel_id,
    } = createFuncionarioBodySchema.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('funcionario').insert({
      id: randomUUID(),
      nome,
      email,
      senha,
      telefone,
      cargo,
      salario,
      data_contratacao,
      papel_id,
    })

    return reply.status(201).send({})
  })

  app.post('/dados-bancarios', async (request, reply) => {
    const createDadosBancariosBodySchema = z.object({
      nomeBanco: z.string(),
      agencia: z.string(),
      conta: z.string(),
      tipo: z.string(),
      pix: z.string(),
    })

    const { nomeBanco, agencia, conta, tipo, pix } =
      createDadosBancariosBodySchema.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('dados_bancarios').insert({
      id: randomUUID(),
      nomeBanco,
      agencia,
      conta,
      tipo,
      pix,
    })

    return reply.status(201).send({})
  })

  app.post('/contra-cheque', async (request, reply) => {
    const createContraChequeBodySchema = z.object({
      valor: z.number(),
      data: z.coerce.date(),
      funcionario_id: z.string(),
    })

    const { valor, data, funcionario_id } = createContraChequeBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('contra_cheque').insert({
      id: randomUUID(),
      valor,
      data,
      funcionario_id,
    })

    return reply.status(201).send({})
  })
}
