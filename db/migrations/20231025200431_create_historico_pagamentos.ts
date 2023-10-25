import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('historico_pagamentos', (table) => {
    table.uuid('id').primary();
    table.string('cliente_id').notNullable();
    table.date('data').notNullable();
    table.string('descricao').notNullable();
    table.decimal('valor').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('historico_pagamentos');
}
