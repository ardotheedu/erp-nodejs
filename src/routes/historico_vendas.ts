import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { knex } from '../database';

export async function historicoPagamentosRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    try {
      const historicoPagamentos = await knex('historico_pagamentos').select('*');
      reply.send({ historicoPagamentos });
    } catch (error) {
      console.error(error);
      reply.code(500).send('Erro ao buscar histórico de pagamentos.');
    }
  });

  app.post('/', async (request, reply) => {
    try {
      const novoHistoricoPagamento = request.body;
      const [id] = await knex('historico_pagamentos').insert(novoHistoricoPagamento);
      reply.code(201).send({ id });
    } catch (error) {
      console.error(error);
      reply.code(500).send('Erro ao criar histórico de pagamento.');
    }
  });
}
