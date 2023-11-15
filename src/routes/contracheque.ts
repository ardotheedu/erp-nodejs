import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { knex } from '../database';

export async function contraChequeRoutes(app: FastifyInstance) {
  app.get('/contra_cheque/:month/:year', async (request, reply) => {
    const getContraChequesParamsSchema = z.object({
      month: z.number(),
      year: z.number(),
    });

    try {
      const { month, year } = getContraChequesParamsSchema.parse(request.params);

      const contraCheques = await knex('contra_cheque')
        .select('*')
        .whereRaw('MONTH(data_emissao) = ? AND YEAR(data_emissao) = ?', [month, year]);

      return { contraCheques };
    } catch (error) {
      console.error(error);
      return reply.status(500).send('Erro ao buscar contra-cheques por mês.');
    }
  });
}
