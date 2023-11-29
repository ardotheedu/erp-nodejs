import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('alimentos', (table) => {
    table.uuid('id').primary()
    table.string('nome').notNullable()
    table.string('unidade_medida').notNullable()
    table.integer('quantidade_em_estoque').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('alimentos')
}
