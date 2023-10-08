import { Knex } from "knex";
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("caixa", (table) => {
    table.uuid("ID").primary();
    table.timestamp("abertura").notNullable();
    table.timestamp("fechamento");
    table.decimal("saldo_inicial", 10, 2).notNullable(); //precisão dos números
    table.decimal("suprimento", 10, 2);
    table.decimal("sangria", 10, 2);
    table.decimal("saldo_atual", 10, 2).notNullable();
    table.decimal("saldo_fechamento", 10, 2);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("caixa");
}
