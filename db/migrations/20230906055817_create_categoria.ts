import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('categoria', (table)=>{
        table.uuid('id').primary()
        table.string('nome').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("categoria");
}

