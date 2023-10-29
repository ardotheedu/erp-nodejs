import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { knex } from '../database';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function lancamentoRoutes(app: FastifyInstance) {
  // Rota para obter todos os lançamentos (GET)
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      try {
        // Lógica para obter todos os lançamentos
        const lancamentos = await knex('lancamento').select();
        return { lancamentos };
      } catch (error) {
        console.error(error);
        return { error: 'Erro ao buscar lançamentos.' };
      }
    }
  );  
  // Rota para obter um lançamento por ID (GET)
  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      // Lógica para obter um lançamento por ID
      // ...
      return {
        lancamentoRoutes,
      };
    }
  );

  // Rota para criar um novo lançamento (POST)
  app.post('/', async (request, reply) => {
    const createLancamentoBodySchema = z.object({
      id_nota: z.string().uuid(),
      data_vencimento: z.coerce.date(),
      data_pagamento: z.coerce.date(),
      valor: z.number(),
      metodo_pagamento: z.string(),
    });
  
    try {
      const {
        id_nota,
        data_vencimento,
        data_pagamento,
        valor,
        metodo_pagamento,
      } = createLancamentoBodySchema.parse(request.body);
  
      const id = randomUUID();
  
      await knex('lancamento').insert({
        id,
        id_nota,
        data_vencimento,
        data_pagamento,
        valor,
        metodo_pagamento,
      });
      return reply.status(201).send({ message: 'Lançamento cadastrado com sucesso!' });
    } catch (error) {
      console.error(error);
      return reply.status(400).send({ message: 'Erro ao cadastrar lançamento.' });
    }
  });
  

  // Rota para atualizar um lançamento por ID (PUT)
  app.put(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const updateLancamentoBodySchema = z.object({
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
      } = updateLancamentoBodySchema.parse(request.body);

      const { id } = request.params;

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
  // Rota para excluir um lançamento por ID (DELETE)
  app.delete(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { id } = request.params;

      try {
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
