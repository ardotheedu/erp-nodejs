import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('funcionario', (table) => {
    table.uuid('id').primary()
    table.string('nome').notNullable()
    table.string('email').notNullable()
    table.string('senha').notNullable()
    table.string('telefone')
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.text('cargo')
    table.string('salario')
    table.timestamp('data_contratacao').notNullable()
    table.string('papel_id')
    table.foreign('papel_id').references('id').inTable('permissao')
    table.string('papel_id')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('funcionario')
}
