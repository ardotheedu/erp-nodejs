import { randomUUID } from 'crypto';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('contra_cheque').del();

  // Inserts seed entries
  await knex('contra_cheque').insert([
    {
      id: randomUUID(),
      id_funcionario: '11223344',
      remuneracao_principal: '1500.00',
      comissao: '200.00',
      impostos: '150.00',
      data_referencia: '2023-05', // Mês e ano de referência (maio de 2023)
    },
    {
      id: randomUUID(),
      id_funcionario: '22334455',
      remuneracao_principal: '1800.00',
      comissao: '250.00',
      impostos: '180.00',
      data_referencia: '2023-06', // Mês e ano de referência (junho de 2023)
    },
    {
      id: randomUUID(),
      id_funcionario: '33445566',
      remuneracao_principal: '1200.00',
      comissao: '150.00',
      impostos: '120.00',
      data_referencia: '2023-04', // Mês e ano de referência (abril de 2023)
    },
  ]);
}
