import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("cliente", (table) => {
    table.uuid("id").primary();
    table.string("nome").notNullable();
    table.string("email").notNullable();
    table.string("telefone");
    table.string("cpf_cnpj").notNullable();
    table.string("tipo");
  });
}
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("cliente");
}
