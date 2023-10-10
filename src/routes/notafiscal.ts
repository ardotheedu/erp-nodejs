import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { knex } from '../database';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function notaFiscalRoutes(app: FastifyInstance) {
  // Rota para criar uma nova nota fiscal (POST)
  app.post(
    '/notafiscal',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      // Lógica para criar uma nova nota fiscal
      // ...
      return reply.status(201).send();
    }
  );

  // Rota para obter todas as notas fiscais (GET)
  app.get(
    '/notafiscal',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      // Lógica para obter todas as notas fiscais
      // ...
      return { notaFiscalRoutes };
    }
  );

  // Rota para atualizar uma nota fiscal por ID (PUT)
  app.put(
    '/notafiscal/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const updateNotaFiscalBodySchema = z.object({
        numero_nota: z.number(),
      });

      const { numero_nota } = updateNotaFiscalBodySchema.parse(request.body);

      const { id } = request.params;

      try {
        // Verifica se o ID existe antes de atualizar
        const notaFiscal = await knex('notafiscal')
          .where({ id })
          .first();

        if (!notaFiscal) {
          return reply.status(404).send('Nota fiscal não encontrada.');
        }

        await knex('notafiscal')
          .where({ id })
          .update({
            numero_nota,
          });

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply.status(500).send('Erro ao atualizar a nota fiscal.');
      }
    }
  );

  // Rota para excluir uma nota fiscal por ID (DELETE)
  app.delete(
    '/notafiscal/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { id } = request.params;

      try {
        // Verifica se o ID existe antes de excluir
        const notaFiscal = await knex('notafiscal')
          .where({ id })
          .first();

        if (!notaFiscal) {
          return reply.status(404).send('Nota fiscal não encontrada.');
        }

        await knex('notafiscal')
          .where({ id })
          .del();

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply.status(500).send('Erro ao excluir a nota fiscal.');
      }
    }
  );
}
