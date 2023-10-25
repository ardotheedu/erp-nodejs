import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { knex } from '../database';
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

export async function contraChequePorMesRoutes(app: FastifyInstance) {
  // Rota para obter dados do contra-cheque por mês (GET)
  app.get('/contra-cheque/por-mes', async (request, reply) => {
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
      return reply.status(500).send('Erro ao obter dados do contra-cheque por mês.');
    }
  });

  // Rota para criar um novo registro de contra-cheque por mês (POST)
  app.post('/contra-cheque/por-mes', async (request, reply) => {
    try {
      const novoRegistroContraCheque = request.body;
      const [id] = await knex('contra_cheque').insert(novoRegistroContraCheque);
      return reply.code(201).send({ id });
    } catch (error) {
      console.error(error);
      return reply.status(500).send('Erro ao criar registro de contra-cheque por mês.');
    }
  });
}
