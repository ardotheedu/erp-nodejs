import { randomUUID } from 'crypto';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('historico_pagamentos').del();

  // Inserts seed entries
  await knex('historico_pagamentos').insert([
    {
      id: randomUUID(),
      cliente_id: '1',
      data: '2023-05-10',
      descricao: 'Pagamento efetuado',
      valor: '500.00',
    },
    {
      id: randomUUID(),
      cliente_id: '2',
      data: '2023-06-15',
      descricao: 'Pagamento efetuado',
      valor: '300.00',
    },
  ]);
}
