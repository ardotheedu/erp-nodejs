import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("item_pedido", (table) => {
    table.uuid("id").primary();
    table.integer("pedido_id_item").unsigned().notNullable();
    table.foreign("pedido_id_item").references("pedido_id").inTable("vendas");
    table.integer("produto_id").notNullable();
    table.integer("quantidade").notNullable();
    table.decimal("preco_unitario", 10, 2).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("item_pedido");
}
