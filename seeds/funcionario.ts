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
      email: 'gabriel@gmail.com',
      senha: '123456',
      telefone: '123456789',
      cargo: 'Estoquista',
      salario: '1.320',
      data_contratacao: '2021-09-03',
      papel_id: '123435',
    },
    {
      id: randomUUID(),
      nome: 'João',
      email: 'joao@gmail.com',
      senha: '123456',
      telefone: '123456789',
      cargo: 'Estoquista',
      salario: '1.320',
      data_contratacao: '2021-10-02',
      papel_id: '1',
    },
    {
      id: randomUUID(),
      nome: 'Luiz',
      email: 'luiz@gmail.com',
      senha: '123456',
      telefone: '123456789',
      cargo: 'Desenvolvedor Front-End',
      salario: '2.600',
      data_contratacao: '2021-06-15',
      papel_id: '2',
    },
    {
      id: randomUUID(),
      nome: 'Mariana',
      email: 'mariana@gmail.com',
      senha: '123456',
      telefone: '123456789',
      cargo: 'Analista Financeiro',
      salario: '2.700',
      data_contratacao: '2021-07-30',
      papel_id: '2',
    },
    {
      id: randomUUID(),
      nome: 'Gustavo',
      email: 'gustavo@gmail.com',
      senha: '123456',
      telefone: '123456789',
      cargo: 'Atendente',
      salario: '1.180',
      data_contratacao: '2021-11-10',
      papel_id: '3',
    },
    {
      id: randomUUID(),
      nome: 'Fernanda',
      email: 'fernanda@gmail.com',
      senha: '123456',
      telefone: '123456789',
      cargo: 'Designer de Produto',
      salario: '2.300',
      data_contratacao: '2021-08-10',
      papel_id: '2',
    },
    {
      id: randomUUID(),
      nome: 'Roberto',
      email: 'roberto@gmail.com',
      senha: '123456',
      telefone: '123456789',
      cargo: 'Estoquista',
      salario: '1.350',
      data_contratacao: '2021-09-15',
      papel_id: '1',
    },
  ])
}
