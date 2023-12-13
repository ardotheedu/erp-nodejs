import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("unidade_medida", (table) => {
    table.increments("id").primary();
    table.string("nome").notNullable().unique();
    table.string("sigla").notNullable().unique();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("unidade_medida");
}
