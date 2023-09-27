import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { knex } from '../database';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function notaFiscalRoutes(app: FastifyInstance) {
  app.post(
    '/notafiscal',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const createNotaFiscalBodySchema = z.object({
        numero_nota: z.number(),
      });

      const { numero_nota } = createNotaFiscalBodySchema.parse(request.body);

      let sessionId = request.cookies.sessionId;

      if (!sessionId) {
        sessionId = randomUUID();

        reply.setCookie('sessionId', sessionId, {
          path: '/',
          maxAge: 1000 * 60 * 60 * 24 * 7, 
        });
      }
      await knex('notafiscal').insert({
        id: randomUUID(),
        numero_nota,
      });

      return reply.status(201).send();
    }
  );

  app.get(
    '/notafiscal',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies;
      const notasFiscais = await knex('notafiscal').select();

      return { notasFiscais };
    }
  );
}
