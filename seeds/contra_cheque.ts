import { randomUUID } from 'crypto'
import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('contra_cheque').del()

  // Inserts seed entries
  await knex('contra_cheque').insert([
    {
      id: '0987654321',
      id_funcionario: '11254563',
      remuneracao_principal: '1000.00',
      comissao: '100.00',
      impostos: '100.00',
    },
  ])
}
