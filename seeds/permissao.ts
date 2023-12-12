import { randomUUID } from 'crypto'
import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('permissao').del()

  // Inserts seed entries
  await knex('permissao').insert([
    { id: randomUUID(), nome: 'admin' },
    { id: randomUUID(), nome: 'user' },
  ])
}
