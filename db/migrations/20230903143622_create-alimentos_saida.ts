import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("alimentos_saida", (table) => {
    table.increments("id").primary();
    table
      .integer("id_alimento")
      .notNullable()
      .references("id")
      .inTable("alimentos");
    table
      .integer("id_saida")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("saida")
      .onDelete("CASCADE");
    table.decimal("quantidade", 14, 2).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("alimentos_saida");
}
