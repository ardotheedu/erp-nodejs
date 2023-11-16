import { randomUUID } from 'crypto'
import { Knex } from 'knex'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)
export async function seed(knex: Knex): Promise<void> {
  await knex('contra_cheque').del();

  await knex('contra_cheque').insert([
    {
      id_funcionario: 1,
      remuneracao_principal: 1000.0,
      comissao: 200.0,
      impostos: 50.0,
      data_emissao: dayjs('01/07/2023', 'DD/MM/YYYY').format(),
    },
    {
      id_funcionario: 2,
      remuneracao_principal: 1200.0,
      comissao: 150.0,
      impostos: 40.0,
      data_emissao: dayjs('01/08/2023', 'DD/MM/YYYY').format(),
    },
    {
      id_funcionario: 3,
      remuneracao_principal: 1500.0,
      comissao: 200.0,
      impostos: 60.0,
      data_emissao: dayjs('01/09/2023', 'DD/MM/YYYY').format(),
    },
  ]);
}
