import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("venda_saida", (table) => {
    table.uuid("id").primary();
    table.integer("pedido_id_venda").unsigned().notNullable();
    table.foreign("pedido_id_venda").references("pedido_id").inTable("vendas");
    table.timestamp("data_saida").notNullable();
    table.integer("funcionario_id").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("venda_saida");
}
