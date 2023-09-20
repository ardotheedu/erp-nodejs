import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('contra_cheque', (table) => {
    table.increments('id').primary()
    table
      .integer('id_funcionario')
      .notNullable()
      .references('id')
      .inTable('funcionarios')
    table.decimal('remuneracao_principal', 10, 2).notNullable()
    table.decimal('comissao', 10, 2).notNullable()
    table.decimal('impostos', 10, 2).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('contra_cheque')
}
