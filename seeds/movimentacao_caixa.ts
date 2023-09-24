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
    {
      id: randomUUID(),
      timestamp: new Date(),
      tipo: 'entrada',
      valor: 75.00,
    },
    {
      id: randomUUID(),
      timestamp: new Date(),
      tipo: 'saida',
      valor: 30.00,
    },
    {
      id: randomUUID(),
      timestamp: new Date(),
      tipo: 'devolucao',
      valor: 15.00,
    },
    {
      id: randomUUID(),
      timestamp: new Date(),
      tipo: 'entrada',
      valor: 120.00,
    },
    {
      id: randomUUID(),
      timestamp: new Date(),
      tipo: 'saida',
      valor: 60.00,
    },
    {
      id: randomUUID(),
      timestamp: new Date(),
      tipo: 'entrada',
      valor: 90.00,
    },
    {
      id: randomUUID(),
      timestamp: new Date(),
      tipo: 'saida',
      valor: 45.00,
    },
  ])
}
