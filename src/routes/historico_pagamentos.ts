import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { knex } from '../database';

export async function historicoVendasRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    try {
      const historicoVendas = await knex('historico_vendas').select('*');
      return { historicoVendas };
    } catch (error) {
      console.error(error);
      reply.code(500).send('Erro ao buscar histórico de vendas.');
    }
  });

  app.post('/', async (request, reply) => {
    try {
      const novoHistoricoVenda = request.body;
      const [id] = await knex('historico_vendas').insert(novoHistoricoVenda);
      reply.code(201).send({ id });
    } catch (error) {
      console.error(error);
      reply.code(500).send('Erro ao criar histórico de venda.');
    }
  });
}
