import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('movimentacao', (table)=>{
        table.uuid('id').primary()
        table.string('nome').notNullable()
        table.string('descricao').nullable()
        table.enum('tipo_movimentacao',['entrada', 'saida', 'devolucao']).notNullable()
        table.integer('quantidade').notNullable()
        table.timestamp('data_movimentacao').notNullable()

        table.uuid('movimentacao_produto_id')
            .notNullable()
            .references('id')
            .inTable('produto');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('movimentacao');
}

