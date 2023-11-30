import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('entrada_alimentos', (table) => {
    table.uuid('id').primary()
    table.uuid('alimento_id').references('alimentos.id')
    table.date('data_vencimento').notNullable()
    table.date('data_entrada').notNullable()
    table.integer('quantidade').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('entrada_alimentos')
}
