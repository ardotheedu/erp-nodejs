import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { knex } from '../database';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function caixaRoutes(app: FastifyInstance) {
  // Rota para obter informações do caixa (GET)
  app.get(
    '/caixa',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      // Lógica para obter informações do caixa
      // ...
      return { caixaRoutes };
    }
  );

  // Rota para criar uma nova entrada no caixa (POST)
  app.post('/caixa', async (request, reply) => {
    // Lógica para criar uma nova entrada no caixa
    // ...
    return reply.status(201).send();
  });

  // Rota para atualizar informações do caixa por ID (PUT)
  app.put(
    '/caixa/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const updateCaixaBodySchema = z.object({
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
      } = updateCaixaBodySchema.parse(request.body);

      const { id } = request.params;

      try {
        // Verifica se o ID existe antes de atualizar
        const caixaInfo = await knex('caixa')
          .where({ ID: id })
          .first();

        if (!caixaInfo) {
          return reply.status(404).send('Informações do caixa não encontradas.');
        }

        await knex('caixa')
          .where({ ID: id })
          .update({
            abertura,
            fechamento,
            saldo_inicial,
            suprimento,
            sangria,
            saldo_atual,
            saldo_fechamento,
          });

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply.status(500).send('Erro ao atualizar as informações do caixa.');
      }
    }
  );

  // Rota para excluir informações do caixa por ID (DELETE)
  app.delete(
    '/caixa/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { id } = request.params;

      try {
        // Verifica se o ID existe antes de excluir
        const caixaInfo = await knex('caixa')
          .where({ ID: id })
          .first();

        if (!caixaInfo) {
          return reply.status(404).send('Informações do caixa não encontradas.');
        }

        await knex('caixa')
          .where({ ID: id })
          .del();

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply.status(500).send('Erro ao excluir as informações do caixa.');
      }
    }
  );
}
