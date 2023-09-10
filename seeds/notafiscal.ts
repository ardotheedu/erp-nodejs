import { randomUUID } from 'crypto'
import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('lancamento').del()

  await knex('lancamento').insert([
    {
      id: randomUUID(),
      numeronota: '12345678910'
    },
    {
      id: randomUUID(),
      numeronota: '10987654321'
    },
  ])
}
