import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('notafiscal', (table)=>{
        table.uuid('id').primary()
        table.integer('numero_nota').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('notafiscal')
}

