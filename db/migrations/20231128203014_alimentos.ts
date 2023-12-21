import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("alimentos", (table) => {
    table.uuid("id").primary();
    table.string("nome").notNullable();
    table
      .integer("unidade_medida_id")
      .unsigned()
      .references("id")
      .inTable("unidade_medida");
    table.integer("quantidade").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("alimentos");
}
