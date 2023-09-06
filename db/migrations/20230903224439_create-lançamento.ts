import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('lancamento',(table) => {
        table.uuid('id').primary()
        //table.foreign('id_fornecedor').references('id').inTable('fornecedor')
        table.uuid('id_nota').unsigned()
        table.foreign('id_nota').references('id').inTable('notafiscal')
        table.timestamp('data_vencimento')
        table.timestamp('data_pagamento')
        table.float('valor').notNullable()
        table.string('metodo_pagamento').notNullable()
        table.integer('numero_nota').notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('lancamento')
}

