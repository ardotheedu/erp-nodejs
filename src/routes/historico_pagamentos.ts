import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { knex } from "../database";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";
export async function historicoPagamentosRoutes(app: FastifyInstance) {
  app.get(
    '/cliente/:id/historico',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const getHistoricoPagamentosParamsSchema = z.object({
        id: z.string().uuid(),
      });

      try {
        const { id } = getHistoricoPagamentosParamsSchema.parse(request.params);
        const historicoPagamentos = await knex('historico_pagamentos')
          .where({ cliente_id: id }) 
          .select('*');

        return historicoPagamentos;
      } catch (error) {
        console.error(error);
        return reply.status(500).send('Erro ao obter o histórico de pagamentos do cliente.');
      }
    }
  );
  app.get(
    '/pagamentos-atraso',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      try {
        const historicoPagamentosAtraso = await knex('historico_pagamentos')
          .where('data', '<', new Date())  
          .select('*');

        return historicoPagamentosAtraso;
      } catch (error) {
        console.error(error);
        return reply.status(500).send('Erro ao obter o histórico de pagamentos em atraso.');
      }
    }
  );

  app.get(
    '/pagamentos-pagos',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      try {
        const historicoPagamentosPagos = await knex('historico_pagamentos')
          .where('data', '>=', new Date())  
          .select('*');

        return historicoPagamentosPagos;
      } catch (error) {
        console.error(error);
        return reply.status(500).send('Erro ao obter o histórico de pagamentos pagos.');
      }
    }
  );
  app.get(
    '/pagamentos-a-vencer',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      try {
        const historicoPagamentosAVencer = await knex('historico_pagamentos')
          .where('data', '>', new Date())
          .select('*');

        return historicoPagamentosAVencer;
      } catch (error) {
        console.error(error);
        return reply.status(500).send('Erro ao obter o histórico de pagamentos a vencer.');
      }
    }
  );
  app.get(
    '/pagamentos-por-data',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const getHistoricoPagamentosPorDataQuerySchema = z.object({
        start_date: z.string(),
        end_date: z.string(),
      });

      try {
        const { start_date, end_date } = getHistoricoPagamentosPorDataQuerySchema.parse(request.query);
        const historicoPagamentosPorData = await knex('historico_pagamentos')
          .whereBetween('data', [start_date, end_date])
          .select('*');

        return historicoPagamentosPorData;
      } catch (error) {
        console.error(error);
        return reply.status(500).send('Erro ao obter o histórico de pagamentos por intervalo de datas.');
      }
    }
  );
}
