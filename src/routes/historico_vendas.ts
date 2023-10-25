import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { knex } from "../database";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";
export async function historicoVendasRoutes(app: FastifyInstance) {
  app.get(
    '/venda-saida/:id/historico',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const getHistoricoVendasParamsSchema = z.object({
        id: z.string().uuid(),
      });

      try {
        const { id } = getHistoricoVendasParamsSchema.parse(request.params);
        const historicoVendas = await knex('historico_vendas')
          .where({ venda_saida_id: id })  
          .select('*');

        return historicoVendas;
      } catch (error) {
        console.error(error);
        return reply.status(500).send('Erro ao obter o histórico de vendas da venda de saída.');
      }
    }
  );
}
