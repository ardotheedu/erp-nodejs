import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { knex } from '../database';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function lancamentoRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies;

      const lancamentos = await knex('lancamento').select();

      return { lancamentos };
    }
  );

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const getLancamentoParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getLancamentoParamsSchema.parse(request.params);

      const { sessionId } = request.cookies;

      const lancamento = await knex('lancamento')
        .where({
          id,
        })
        .first();

      return {
        lancamento,
      };
    }
  );

  app.post('/', async (request, reply) => {
    const createLancamentoBodySchema = z.object({
      id_nota: z.string().uuid(),
      data_vencimento: z.coerce.date(),
      data_pagamento: z.coerce.date(),
      valor: z.number(),
      metodo_pagamento: z.string(),
    });

    const {
      id_nota,
      data_vencimento,
      data_pagamento,
      valor,
      metodo_pagamento,
    } = createLancamentoBodySchema.parse(request.body);

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });
    }

    await knex('lancamento').insert({
      id: randomUUID(),
      id_nota,
      data_vencimento,
      data_pagamento,
      valor,
      metodo_pagamento,
    });

    return reply.status(201).send({});
  });
}
