import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { knex } from '../database';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function movimentacaoCaixaRoutes(app: FastifyInstance) {
  app.post(
    '/movimentacao_caixa',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const createMovimentacaoCaixaBodySchema = z.object({
        timestamp: z.coerce.date(),
        tipo: z.enum(['entrada', 'saida', 'devolucao']),
        valor: z.number(),
      });

      const { timestamp, tipo, valor } = createMovimentacaoCaixaBodySchema.parse(
        request.body
      );

      let sessionId = request.cookies.sessionId;

      if (!sessionId) {
        sessionId = randomUUID();

        reply.setCookie('sessionId', sessionId, {
          path: '/',
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });
      }

      await knex('movimentacao_caixa').insert({
        id: randomUUID(),
        timestamp,
        tipo,
        valor,
      });

      return reply.status(201).send();
    }
  );

  app.get(
    '/movimentacao_caixa',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies;
      const movimentacoesCaixa = await knex('movimentacao_caixa').select();

      return { movimentacoesCaixa };
    }
  );
}
