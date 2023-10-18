import { randomUUID } from 'crypto'
import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('contra_cheque').del()

  // Inserts seed entries
  await knex('contra_cheque').insert([
    {
      id: '1234567890',
      id_funcionario: '11223344',
      remuneracao_principal: '1500.00',
      comissao: '200.00',
      impostos: '150.00',
    },
    {
      id: '2345678901',
      id_funcionario: '22334455',
      remuneracao_principal: '1800.00',
      comissao: '250.00',
      impostos: '180.00',
    },
    {
      id: '3456789012',
      id_funcionario: '33445566',
      remuneracao_principal: '1200.00',
      comissao: '150.00',
      impostos: '120.00',
    },
    {
      id: '4567890123',
      id_funcionario: '44556677',
      remuneracao_principal: '1600.00',
      comissao: '180.00',
      impostos: '160.00',
    },
    {
      id: '5678901234',
      id_funcionario: '55667788',
      remuneracao_principal: '1400.00',
      comissao: '170.00',
      impostos: '140.00',
    },
    {
      id: '6789012345',
      id_funcionario: '66778899',
      remuneracao_principal: '1700.00',
      comissao: '210.00',
      impostos: '170.00',
    },
    {
      id: '7890123456',
      id_funcionario: '77889900',
      remuneracao_principal: '1900.00',
      comissao: '220.00',
      impostos: '190.00',
    },
    {
      id: '8901234567',
      id_funcionario: '88990011',
      remuneracao_principal: '1100.00',
      comissao: '130.00',
      impostos: '110.00',
    },
    {
      id: '9012345678',
      id_funcionario: '99001122',
      remuneracao_principal: '1300.00',
      comissao: '160.00',
      impostos: '130.00',
    },
    {
      id: '0123456789',
      id_funcionario: '00112233',
      remuneracao_principal: '2000.00',
      comissao: '250.00',
      impostos: '200.00',
    },
  ])
}
