import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { knex } from '../database';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
interface RelatorioQuery {
  data_emissao: string;
}

export async function contraChequeRoutes(app: FastifyInstance) {
  app.get('/', async (request) => {
    try {
      const contraCheques = await knex('contra_cheque').select();
      return { contraCheques };
    } catch (error) {
      console.error(error);
      return { error: 'Erro ao buscar contracheques.' };
    }
  });

  app.get('/:id_funcionario/:data_emissao', async (request, reply) => {
    const getContraChequesParamsSchema = z.object({
      id_funcionario: z.number(),
      data_emissao: z.string(),
    });
  
    try {
      const { id_funcionario, data_emissao } = getContraChequesParamsSchema.parse(request.params);

      const dataInicial = dayjs(data_emissao, 'DD/MM/YYYY').startOf('month').format();
      const dataFinal = dayjs(data_emissao, 'DD/MM/YYYY').endOf('month').format();

      const contraCheques = await knex('contra_cheque')
        .select('*')
        .where({ id_funcionario })
        .andWhere('data_emissao', '>=', dataInicial)
        .andWhere('data_emissao', '<=', dataFinal);
  
      return { contraCheques };
    } catch (error) {
      console.error(error);
      return reply.status(500).send('Erro ao buscar contra-cheques por mês.');
    }
  });
}
