import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('contra_cheque', (table) => {
    table.increments('id').primary();
    table
      .integer('id_funcionario')
      .notNullable()
      .references('id')
      .inTable('funcionarios');
    table.decimal('remuneracao_principal', 10, 2).notNullable();
    table.decimal('comissao', 10, 2).notNullable();
    table.decimal('impostos', 10, 2).notNullable();
    table.timestamp('data_emissao').defaultTo(knex.fn.now());
  });

  await knex('contra_cheque').insert([
    { id_funcionario: 1, remuneracao_principal: 1000.00, comissao: 200.00, impostos: 50.00, data_emissao: '2023-01-01' },
    { id_funcionario: 2, remuneracao_principal: 1200.00, comissao: 150.00, impostos: 40.00, data_emissao: '2023-02-01' },
  ]);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('contra_cheque');
}
