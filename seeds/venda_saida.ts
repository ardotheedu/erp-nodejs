import { randomUUID } from 'crypto'
import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('venda_saida').del()

  // Inserts seed entries
  await knex('venda_saida').insert([
    {
      id: randomUUID(),
      pedido_id_venda: '987654321',
      data_saida: '2023-05-10',
      funcionario_id: '7654321',
      total_da_venda: '764.32',
    },
    {
      id: randomUUID(),
      pedido_id_venda: '1234567890',
      data_saida: '2023-06-15',
      funcionario_id: '9876543',
      total_da_venda: '432.18',
    },
    {
      id: randomUUID(),
      pedido_id_venda: '2345678901',
      data_saida: '2023-04-05',
      funcionario_id: '5432198',
      total_da_venda: '925.75',
    },
    {
      id: randomUUID(),
      pedido_id_venda: '3456789012',
      data_saida: '2023-07-22',
      funcionario_id: '1234567',
      total_da_venda: '541.60',
    },
    {
      id: randomUUID(),
      pedido_id_venda: '4567890123',
      data_saida: '2023-08-30',
      funcionario_id: '6789123',
      total_da_venda: '688.99',
    },
    {
      id: randomUUID(),
      pedido_id_venda: '5678901234',
      data_saida: '2023-09-12',
      funcionario_id: '9871234',
      total_da_venda: '333.25',
    },
    {
      id: randomUUID(),
      pedido_id_venda: '6789012345',
      data_saida: '2023-10-25',
      funcionario_id: '2345678',
      total_da_venda: '775.75',
    },
    {
      id: randomUUID(),
      pedido_id_venda: '7890123456',
      data_saida: '2023-11-02',
      funcionario_id: '8765432',
      total_da_venda: '496.85',
    },
    {
      id: randomUUID(),
      pedido_id_venda: '8901234567',
      data_saida: '2023-12-18',
      funcionario_id: '3456789',
      total_da_venda: '999.99',
    },
    {
      id: randomUUID(),
      pedido_id_venda: '9012345678',
      data_saida: '2023-01-05',
      funcionario_id: '7654321',
      total_da_venda: '333.33',
    },
  ])
}
