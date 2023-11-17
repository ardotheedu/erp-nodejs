import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Criar tabela 'historico_pagamentos'
  await knex.schema.createTable('historico_pagamentos', (table) => {
    table.uuid('id').primary();
    table.integer('cliente_id').unsigned().notNullable();
    table.timestamp('data').notNullable();
    table.string('descricao').notNullable();
    table.decimal('valor', 10, 2).notNullable();
  });

  //só para testar
  await knex('historico_pagamentos').insert([
    { id: '1', cliente_id: 1, data: new Date(), descricao: 'Pagamento 1', valor: 100.00 },
    { id: '2', cliente_id: 2, data: new Date(), descricao: 'Pagamento 2', valor: 150.00 },
  ]);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('historico_pagamentos');
}


