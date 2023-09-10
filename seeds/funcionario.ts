import { randomUUID } from 'crypto'
import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('funcionario').del()

  // Inserts seed entries
  await knex('funcionario').insert([
    {
      id: randomUUID(),
      nome: 'João',
      email: 'joao@gmail.com',
      senha: '123456',
      telefone: '123456789',
      cargo: 'Estoquista',
      salario: '1.320',
      data_contratacao: '2021-09-03',
      papel_id: '1',
    },
    {
      id: randomUUID(),
      nome: 'Maria',
      email: 'maria@gmail.com',
      senha: '123456',
      telefone: '123456789',
      cargo: 'Gerente',
      salario: '2.500',
      data_contratacao: '2021-09-03',
      papel_id: '2',
    },
  ])
}
