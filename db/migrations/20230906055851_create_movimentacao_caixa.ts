import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("movimentacao_caixa", (table) => {
    table.uuid("id").primary();
    table.timestamp("timestamp").notNullable();
    table.enum("tipo", ["entrada", "saida", "devolucao"]).notNullable();
    table.decimal("valor").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("movimentacao_caixa");
}
