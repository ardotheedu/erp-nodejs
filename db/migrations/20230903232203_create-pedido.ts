import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("pedido", (table) => {
    table.uuid("id").primary();
    table.integer("cliente_id_pedido").unsigned().notNullable();
    table
      .foreign("cliente_id_pedido")
      .references("cliente_id")
      .inTable("vendas");
    table.timestamp("data_pedido").notNullable();
    table.decimal("total", 10, 2).notNullable();
    table.string("status_pagamento").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("pedido");
}
