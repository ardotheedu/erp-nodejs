import { randomUUID } from 'crypto'
import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('dados_bancarios').del()

  // Inserts seed entries
  await knex('dados_bancarios').insert([
    {
      id: '293701273913',
      id_funcionario: '29370127391',
      nome_banco: 'Banco do Brasil',
      agencia: '0001',
      conta: '1233',
      tipo: 'PJ',
      pix: '09556785671',
    },
    {
      id: '293701273912',
      id_funcionario: '29370127391',
      nome_banco: 'Banco do Nordeste',
      agencia: '0001',
      conta: '1233',
      tipo: 'PJ',
      pix: '09556785671',
    },
  ])
}
