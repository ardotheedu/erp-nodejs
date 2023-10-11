import { randomUUID } from 'crypto'
import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('fornecedor').del()

  // Inserts seed entries
  await knex('fornecedor').insert([
    {
      id: '7afca9e3-6542-4a1e-90b0-82e1c6c0a759',
      nome_fantasia: 'Fornecedor 3',
      cnpj: '45.123.789/0001-99',
      telefone: '77777777777',
      email: 'fornecedor3@empresa.com',
    },
    {
      id: 'b8e2d9c6-9032-4d9a-8f4f-10198a27b981',
      nome_fantasia: 'Fornecedor 4',
      cnpj: '78.456.123/0001-45',
      telefone: '66666666666',
      email: 'fornecedor4@empresa.com',
    },
    {
      id: '3c8c7be2-d5f4-42a0-aa24-8d00265185f7',
      nome_fantasia: 'Fornecedor 5',
      cnpj: '90.789.456/0001-12',
      telefone: '55555555555',
      email: 'fornecedor5@empresa.com',
    },
    {
      id: 'e0a21a0e-4093-4d20-8a53-70f207053e67',
      nome_fantasia: 'Fornecedor 6',
      cnpj: '23.567.890/0001-68',
      telefone: '44444444444',
      email: 'fornecedor6@empresa.com',
    },
    {
      id: 'fe3db23d-90ae-4cb1-b8b5-772cbf6471c9',
      nome_fantasia: 'Fornecedor 7',
      cnpj: '34.901.234/0001-76',
      telefone: '33333333333',
      email: 'fornecedor7@empresa.com',
    },
    {
      id: '2bde8e7c-4919-48c7-819e-79598b771a4d',
      nome_fantasia: 'Fornecedor 8',
      cnpj: '67.345.678/0001-34',
      telefone: '22222222222',
      email: 'fornecedor8@empresa.com',
    },
    {
      id: 'dbb9b4f3-36d9-464a-b2f0-c8ef6759b8ad',
      nome_fantasia: 'Fornecedor 9',
      cnpj: '56.678.901/0001-90',
      telefone: '11111111111',
      email: 'fornecedor9@empresa.com',
    },
    {
      id: 'f3409ec6-2c6d-4c08-8425-cd41b3f6d9db',
      nome_fantasia: 'Fornecedor 10',
      cnpj: '45.890.123/0001-56',
      telefone: '99999999999',
      email: 'fornecedor10@empresa.com',
    },
    {
      id: 'f3409ec6-2c6d-4c08-8425-cd41b3f6d9d9',
      nome_fantasia: 'Fornecedor 10',
      cnpj: '45.890.123/0001-56',
      telefone: '99999999999',
      email: 'fornecedorBIQUEIRA@empresa.com',
    },
    {
      id: 'f3409ec6-2c6d-4c08-8425-cd40b3f6d9d9',
      nome_fantasia: 'Fornecedor 10',
      cnpj: '45.890.123/0001-56',
      telefone: '99999999999',
      email: 'fORNCEDOR DE META@empresa.com',
    },
  ])
}
