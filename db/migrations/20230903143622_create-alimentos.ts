import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("alimentos", (table) => {
    table.increments("id").primary();
    table.string("nome").notNullable();
    table.decimal("quantidade", 14, 2).notNullable();
    table.string("unidade_medida").notNullable();
    table.dateTime("data").notNullable();
    table.time("hora").notNullable();
    table.date("validade").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("alimentos");
}
