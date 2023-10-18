import { randomUUID } from 'crypto'
import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('item_pedido').del()

  // Inserts seed entries
  await knex('item_pedido').insert([
    {
      id: randomUUID(),
      pedido_id_item: '98542321478',
      produto_id: '325648795',
      quantidade: '15',
      preco_unitario: '29.99',
    },
    {
      id: randomUUID(),
      pedido_id_item: '12345678901',
      produto_id: '987654321',
      quantidade: '8',
      preco_unitario: '42.50',
    },
    {
      id: randomUUID(),
      pedido_id_item: '56789012345',
      produto_id: '123456789',
      quantidade: '5',
      preco_unitario: '12.75',
    },
    {
      id: randomUUID(),
      pedido_id_item: '23456789012',
      produto_id: '543216789',
      quantidade: '10',
      preco_unitario: '18.99',
    },
    {
      id: randomUUID(),
      pedido_id_item: '34567890123',
      produto_id: '678912345',
      quantidade: '12',
      preco_unitario: '23.45',
    },
    {
      id: randomUUID(),
      pedido_id_item: '78901234567',
      produto_id: '234567891',
      quantidade: '20',
      preco_unitario: '9.99',
    },
    {
      id: randomUUID(),
      pedido_id_item: '45678901234',
      produto_id: '456789123',
      quantidade: '30',
      preco_unitario: '15.75',
    },
    {
      id: randomUUID(),
      pedido_id_item: '56789123456',
      produto_id: '567891234',
      quantidade: '18',
      preco_unitario: '31.25',
    },
    {
      id: randomUUID(),
      pedido_id_item: '89012345678',
      produto_id: '678912345',
      quantidade: '14',
      preco_unitario: '27.50',
    },
    {
      id: randomUUID(),
      pedido_id_item: '67891234567',
      produto_id: '345678912',
      quantidade: '22',
      preco_unitario: '19.95',
    },
  ])
}
