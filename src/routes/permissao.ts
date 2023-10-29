import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { knex } from '../database';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function permissaoRoutes(app: FastifyInstance) {
  // Rota para obter todas as permissões (GET)
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      try {
        const permissoes = await knex('permissao').select();
        return { permissoes };
      } catch (error) {
        console.error(error);
        return { error: 'Erro ao buscar permissões.' };
      }
    }
  );
  

  // Rota para obter permissão por ID (GET)
  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const getPermissaoParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getPermissaoParamsSchema.parse(request.params);

      const { sessionId } = request.cookies;

      const permissao = await knex('permissao')
        .where({
          id,
        })
        .first();

      return {
        permissao,
      };
    }
  );

  // Rota para criar uma nova permissão (POST)
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

  // Rota para atualizar permissão por ID (PUT)
  app.put(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const updatePermissaoBodySchema = z.object({
        nome: z.string(),
      });

      const { nome } = updatePermissaoBodySchema.parse(request.body);

      const { id } = request.params;

      try {
        // Verifica se o ID existe antes de atualizar
        const permissao = await knex('permissao')
          .where({ id })
          .first();

        if (!permissao) {
          return reply.status(404).send('Permissão não encontrada.');
        }

        await knex('permissao')
          .where({ id })
          .update({
            nome,
          });

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply.status(500).send('Erro ao atualizar a permissão.');
      }
    }
  );

  // Rota para excluir permissão por ID (DELETE)
  app.delete(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { id } = request.params;

      try {
        // Verifica se o ID existe antes de excluir
        const permissao = await knex('permissao')
          .where({ id })
          .first();

        if (!permissao) {
          return reply.status(404).send('Permissão não encontrada.');
        }

        await knex('permissao')
          .where({ id })
          .del();

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply.status(500).send('Erro ao excluir a permissão.');
      }
    }
  );

}
