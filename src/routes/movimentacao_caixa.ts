import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { knex } from '../database';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function movimentacaoCaixaRoutes(app: FastifyInstance) {
  // Rota para criar uma nova movimentação (POST)
  app.post(
    '/movimentacao_caixa',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      // Lógica para criar uma nova movimentação
      // ...
      return reply.status(201).send();
    }
  );

  // Rota para obter todas as movimentações (GET)
  app.get(
    '/movimentacao_caixa',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      // Lógica para obter todas as movimentações
      // ...
      return { movimentacaoCaixaRoutes };
    }
  );

  // Rota para atualizar uma movimentação por ID (PUT)
  app.put(
    '/movimentacao_caixa/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const updateMovimentacaoCaixaBodySchema = z.object({
        tipo: z.enum(['entrada', 'saida', 'devolucao']),
        valor: z.number(),
      });

      const { tipo, valor } = updateMovimentacaoCaixaBodySchema.parse(
        request.body
      );

      const { id } = request.params;

      try {
        // Verifica se o ID existe antes de atualizar
        const movimentacao = await knex('movimentacao_caixa')
          .where({ id })
          .first();

        if (!movimentacao) {
          return reply.status(404).send('Movimentação não encontrada.');
        }

        await knex('movimentacao_caixa')
          .where({ id })
          .update({
            tipo,
            valor,
          });

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply.status(500).send('Erro ao atualizar a movimentação.');
      }
    }
  );

  // Rota para excluir uma movimentação por ID (DELETE)
  app.delete(
    '/movimentacao_caixa/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { id } = request.params;

      try {
        // Verifica se o ID existe antes de excluir
        const movimentacao = await knex('movimentacao_caixa')
          .where({ id })
          .first();

        if (!movimentacao) {
          return reply.status(404).send('Movimentação não encontrada.');
        }

        await knex('movimentacao_caixa')
          .where({ id })
          .del();

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply.status(500).send('Erro ao excluir a movimentação.');
      }
    }
  );
}
