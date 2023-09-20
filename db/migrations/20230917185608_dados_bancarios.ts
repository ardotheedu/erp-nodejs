import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('dados_bancarios', (table) => {
    table.increments('id').primary()
    table
      .integer('id_funcionario')
      .notNullable()
      .references('id')
      .inTable('funcionarios')
    table.string('nome_banco').notNullable()
    table.string('agencia').notNullable()
    table.string('conta').notNullable()
    table.string('tipo').notNullable()
    table.string('pix').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('dados_bancarios')
}
