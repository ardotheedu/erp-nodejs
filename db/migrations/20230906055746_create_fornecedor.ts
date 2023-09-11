import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('fornecedor', (table)=>{
        table.uuid('id').primary()
        table.string('nome_fantasia').notNullable()
        table.string('cnpj').notNullable()
        table.string('telefone').notNullable()
        table.string('email').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('fornecedor');
}

