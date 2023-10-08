import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { knex } from '../database';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function caixaRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies;

      const caixaInfo = await knex('caixa').select();

      return { caixaInfo };
    }
  );

  app.post('/', async (request, reply) => {
    const createCaixaBodySchema = z.object({
      abertura: z.coerce.date(),
      fechamento: z.union([z.coerce.date().optional(), z.null()]),
      saldo_inicial: z.number(),
      suprimento: z.union([z.number().optional(), z.null()]),
      sangria: z.union([z.number().optional(), z.null()]),
      saldo_atual: z.number(),
      saldo_fechamento: z.union([z.number().optional(), z.null()]),
    });

    const {
      abertura,
      fechamento,
      saldo_inicial,
      suprimento,
      sangria,
      saldo_atual,
      saldo_fechamento,
    } = createCaixaBodySchema.parse(request.body);

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, 
      });
    }

    await knex('caixa').insert({
      ID: randomUUID(),
      abertura,
      fechamento,
      saldo_inicial,
      suprimento,
      sangria,
      saldo_atual,
      saldo_fechamento,
    });

    return reply.status(201).send({});
  });
}
