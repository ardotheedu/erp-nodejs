import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('produto', (table)=>{
        table.uuid('id').primary()
        table.string('nome').notNullable()
        table.string('descricao').nullable()
        table.decimal('preco_unitario', 10, 2).notNullable()
        table.decimal('preco_venda', 10, 2).notNullable()
        table.integer('quantidade').notNullable()
        table.timestamp('data_validade').notNullable()
        table.string('lote').notNullable()

        table.uuid('produto_categoria_id').notNullable()
            .references('id').inTable('categoria');
        
            table.uuid('produto_fornecedor_id').notNullable()
            .references('id').inTable('fornecedor');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('produto');
}

