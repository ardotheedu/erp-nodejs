import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { knex } from "../database";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";
export async function contraChequePorMesRoutes(app: FastifyInstance) {
    app.get(
      '/contra-cheque/por-mes',
      {
        preHandler: [checkSessionIdExists],
      },
      async (request, reply) => {
        const getContraChequePorMesQuerySchema = z.object({
          year: z.string(),
          month: z.string(), 
        });
  
        try {
          const { year, month } = getContraChequePorMesQuerySchema.parse(request.query);
          const contraChequePorMes = await knex('contra_cheque')
            .whereRaw(`DATE_FORMAT(data_referencia, '%Y-%m') = ?`, [`${year}-${month}`])
            .select('*');
  
          return contraChequePorMes;
        } catch (error) {
          console.error(error);
          return reply.status(500).send('Erro ao obter dados do contra cheque por mês.');
        }
      }
    );
  }
  