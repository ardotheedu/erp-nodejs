import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { knex } from '../database';

export async function contraChequeRoutes(app: FastifyInstance) {
  app.get('/contra_cheque/:id_funcionario/:data_emissao', async (request, reply) => {
    const getContraChequesParamsSchema = z.object({
      id_funcionario: z.number(),
      data_emissao: z.string(),
    });
  
    try {
      const { id_funcionario, data_emissao } = getContraChequesParamsSchema.parse(request.params);
  
      const contraCheques = await knex('contra_cheque')
        .select('*')
        .where({ id_funcionario, data_emissao });
  
      return { contraCheques };
    } catch (error) {
      console.error(error);
      return reply.status(500).send('Erro ao buscar contra-cheques por mês.');
    }
  });
  
}
