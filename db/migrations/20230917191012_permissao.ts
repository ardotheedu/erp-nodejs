import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('permissao', (table) => {
    table.uuid('id').primary()
    table.string('nome').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('permissao')
}
