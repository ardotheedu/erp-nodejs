import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("saida", (table) => {
    table.increments("id").primary();
    table.dateTime("data").notNullable();
    table.time("hora").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("saida");
}
