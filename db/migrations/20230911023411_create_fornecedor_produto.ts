import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('fornecedor_produto', (table)=>{
        table.uuid('id').primary()
        table.uuid('fornecedor_id')
            .notNullable()
            .references('id').inTable("fornecedor");
        
            table.uuid('produto_id')
            .notNullable()
            .references('id').inTable('produto');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('fornecedor_produto');
}

