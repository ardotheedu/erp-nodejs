import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { knex } from '../database';

export async function movimentacaoCaixaRoutes(app: FastifyInstance) {
  app.get('/', async (request) => {
    try {
      const movimentacoes = await knex('movimentacao_caixa').select();
      return { movimentacoes };
    } catch (error) {
      console.error(error);
      return { error: 'Erro ao buscar movimento do caixa.' };
    }
  });

  // Rota para criar uma nova movimentação de caixa (POST)
  app.post('/', async (request, reply) => {
    const createMovimentacaoCaixaBodySchema = z.object({
      tipo: z.enum(['entrada', 'saida', 'devolucao']),
      valor: z.number(),
    });

    try {
      const { tipo, valor } = createMovimentacaoCaixaBodySchema.parse(request.body);
      const id = randomUUID();

      await knex('movimentacao_caixa').insert({
        id,
        tipo,
        valor,
      });

      return reply.status(201).send({ message: 'Movimentação de caixa cadastrada com sucesso!' });
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: 'Erro ao cadastrar a movimentação de caixa.' });
    }
  });

  // Rota para atualizar uma movimentação de caixa por ID (PUT)
  app.put('/movimentacao_caixa/:id', async (request, reply) => {
    const updateMovimentacaoCaixaParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const updateMovimentacaoCaixaBodySchema = z.object({
      tipo: z.enum(['entrada', 'saida', 'devolucao']),
      valor: z.number(),
    });

    try {
      const { id } = updateMovimentacaoCaixaParamsSchema.parse(request.params);
      const { tipo, valor } = updateMovimentacaoCaixaBodySchema.parse(request.body);

      // Verifica se o ID existe antes de atualizar
      const movimentacao = await knex('movimentacao_caixa')
        .where({ id })
        .first();

      if (!movimentacao) {
        return reply.status(404).send('Movimentação de caixa não encontrada.');
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
      return reply.status(500).send('Erro ao atualizar a movimentação de caixa.');
    }
  });

  // Rota para excluir uma movimentação de caixa por ID (DELETE)
  app.delete('/movimentacao_caixa/:id', async (request, reply) => {
    const deleteMovimentacaoCaixaParamsSchema = z.object({
      id: z.string().uuid(),
    });

    try {
      const { id } = deleteMovimentacaoCaixaParamsSchema.parse(request.params);
      const movimentacao = await knex('movimentacao_caixa')
        .where({ id })
        .first();

      if (!movimentacao) {
        return reply.status(404).send('Movimentação de caixa não encontrada.');
      }

      await knex('movimentacao_caixa')
        .where({ id })
        .del();

      return reply.status(204).send();
    } catch (error) {
      console.error(error);
      return reply.status(500).send('Erro ao excluir a movimentação de caixa.');
    }
  });
}
