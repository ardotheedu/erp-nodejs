import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("saida_alimentos", (table) => {
    table.uuid("id").primary();
    table.uuid("alimento_id").references("alimentos.id");
    table.integer("quantidade").notNullable();
    table.timestamp("data_saida").notNullable();
    table
      .integer("unidade_medida_id")
      .unsigned()
      .references("id")
      .inTable("unidade_medida");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("saida_alimentos");
}
