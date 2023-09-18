import { randomUUID } from 'crypto'
import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('movimentacao_caixa').del()

  // Inserts seed entries
  await knex('movimentacao_caixa').insert([
    {
      id: randomUUID(),
      timestamp: new Date(),
      tipo: 'entrada',
      valor: 100.00,
    },
    {
      id: randomUUID(),
      timestamp: new Date(),
      tipo: 'saida',
      valor: 50.00,
    },
    {
      id: randomUUID(),
      timestamp: new Date(),
      tipo: 'devolucao',
      valor: 25.00,
    },
  ])
}
