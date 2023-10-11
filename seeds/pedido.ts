import { randomUUID } from 'crypto'
import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('pedido').del()

  // Inserts seed entries
  await knex('pedido').insert([
    {
      id: randomUUID(),
      cliente_id_pedido: '9988',
      data_pedido: '2023-10-12',
      total: '2500.99',
      status_pagamento: 'aprovado',
      status_pedido: 'em processamento',
    },
    {
      id: randomUUID(),
      cliente_id_pedido: '7543',
      data_pedido: '2023-09-17',
      total: '985.50',
      status_pagamento: 'pendente',
      status_pedido: 'em processamento',
    },
    {
      id: randomUUID(),
      cliente_id_pedido: '1001',
      data_pedido: '2023-11-05',
      total: '420.25',
      status_pagamento: 'aprovado',
      status_pedido: 'em processamento',
    },
    {
      id: randomUUID(),
      cliente_id_pedido: '3225',
      data_pedido: '2023-12-03',
      total: '750.75',
      status_pagamento: 'aprovado',
      status_pedido: 'em processamento',
    },
    {
      id: randomUUID(),
      cliente_id_pedido: '5467',
      data_pedido: '2023-12-18',
      total: '160.50',
      status_pagamento: 'aprovado',
      status_pedido: 'em processamento',
    },
    {
      id: randomUUID(),
      cliente_id_pedido: '1234',
      data_pedido: '2023-01-15',
      total: '990.00',
      status_pagamento: 'aprovado',
      status_pedido: 'em processamento',
    },
    {
      id: randomUUID(),
      cliente_id_pedido: '8765',
      data_pedido: '2023-02-20',
      total: '430.75',
      status_pagamento: 'aprovado',
      status_pedido: 'em processamento',
    },
    {
      id: randomUUID(),
      cliente_id_pedido: '4321',
      data_pedido: '2023-03-10',
      total: '1200.25',
      status_pagamento: 'aprovado',
      status_pedido: 'em processamento',
    },
    {
      id: randomUUID(),
      cliente_id_pedido: '5432',
      data_pedido: '2023-04-05',
      total: '280.99',
      status_pagamento: 'aprovado',
      status_pedido: 'em processamento',
    },
    {
      id: randomUUID(),
      cliente_id_pedido: '5432',
      data_pedido: '2023-04-05',
      total: '280.99',
      status_pagamento: 'aprovado',
      status_pedido: 'em processamento',
    },
  ])
}
