import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { knex } from '../database';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function permissaoRoutes(app: FastifyInstance) {
  app.get('/', async (request) => {
    try {
      const permissoes = await knex('permissao').select();
      return { permissoes };
    } catch (error) {
      console.error(error);
      return { error: 'Erro ao buscar permissões.' };
    }
  });

  app.post('/', async (request, reply) => {
    const createPermissaoBodySchema = z.object({
      nome: z.string(),
    });
  
    try {
      const { nome } = createPermissaoBodySchema.parse(request.body);
  
      const id = randomUUID();
  
      await knex('permissao').insert({
        id,
        nome,
      });
      return reply.status(201).send({ message: 'Permissão cadastrada com sucesso!' });
    } catch (error) {
      console.error(error);
      return reply.status(400).send({ message: 'Erro ao cadastrar permissão.' });
    }
  });
  
  app.put(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const updateLancamentoParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const updateLancamentoBodySchema = z.object({
        id_nota: z.string().uuid(),
        data_vencimento: z.coerce.date(),
        data_pagamento: z.coerce.date(),
        valor: z.number(),
        metodo_pagamento: z.string(),
      });

      const { id } = updateLancamentoParamsSchema.parse(request.params);

      const {
        id_nota,
        data_vencimento,
        data_pagamento,
        valor,
        metodo_pagamento,
      } = updateLancamentoBodySchema.parse(request.body);

      try {
        // Verifica se o ID existe antes de atualizar
        const lancamento = await knex('lancamento')
          .where({ id })
          .first();

        if (!lancamento) {
          return reply.status(404).send('Lançamento não encontrado.');
        }

        await knex('lancamento')
          .where({ id })
          .update({
            id_nota,
            data_vencimento,
            data_pagamento,
            valor,
            metodo_pagamento,
          });

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply.status(500).send('Erro ao atualizar o lançamento.');
      }
    }
  );

  // Rota para excluir lançamento por ID (DELETE)
  app.delete(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const deleteLancamentoParamsSchema = z.object({
        id: z.string().uuid(),
      });

      try {
        const { id } = deleteLancamentoParamsSchema.parse(request.params);

        // Verifica se o ID existe antes de excluir
        const lancamento = await knex('lancamento')
          .where({ id })
          .first();

        if (!lancamento) {
          return reply.status(404).send('Lançamento não encontrado.');
        }

        await knex('lancamento')
          .where({ id })
          .del();

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply.status(500).send('Erro ao excluir o lançamento.');
      }
    }
  );
}
