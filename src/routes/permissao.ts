import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function permissaoRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const rh = await knex('permissao').select()

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

      const transaction = await knex('permissao')
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
    const createPermissionBodySchema = z.object({
      nome: z.string(),
    })

    const { nome } = createPermissionBodySchema.parse(request.body)

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
    })

    return reply.status(201).send({})
  })
}
