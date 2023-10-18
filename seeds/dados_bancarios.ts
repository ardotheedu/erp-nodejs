import { randomUUID } from 'crypto'
import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('dados_bancarios').del()

  // Inserts seed entries
  await knex('dados_bancarios').insert([
    {
      id: '293701273914',
      id_funcionario: '29370127392',
      nome_banco: 'Caixa Econômica Federal',
      agencia: '0002',
      conta: '5678',
      tipo: 'PJ',
      pix: '09556785672',
    },
    {
      id: '293701273915',
      id_funcionario: '29370127393',
      nome_banco: 'Banco do Brasil',
      agencia: '0003',
      conta: '9876',
      tipo: 'PJ',
      pix: '09556785673',
    },
    {
      id: '293701273916',
      id_funcionario: '29370127394',
      nome_banco: 'Santander',
      agencia: '0004',
      conta: '5432',
      tipo: 'PJ',
      pix: '09556785674',
    },
    {
      id: '293701273917',
      id_funcionario: '29370127395',
      nome_banco: 'Itaú',
      agencia: '0005',
      conta: '4321',
      tipo: 'PJ',
      pix: '09556785675',
    },
    {
      id: '293701273918',
      id_funcionario: '29370127396',
      nome_banco: 'Bradesco',
      agencia: '0006',
      conta: '8765',
      tipo: 'PJ',
      pix: '09556785676',
    },
    {
      id: '293701273919',
      id_funcionario: '29370127397',
      nome_banco: 'Banco do Nordeste',
      agencia: '0007',
      conta: '1357',
      tipo: 'PJ',
      pix: '09556785677',
    },
    {
      id: '293701273920',
      id_funcionario: '29370127398',
      nome_banco: 'Banco do Brasil',
      agencia: '0008',
      conta: '8642',
      tipo: 'PJ',
      pix: '09556785678',
    },
    {
      id: '293701273921',
      id_funcionario: '29370127399',
      nome_banco: 'Bradesco',
      agencia: '0009',
      conta: '2468',
      tipo: 'PJ',
      pix: '09556785679',
    },
    {
      id: '293701273922',
      id_funcionario: '29370127391',
      nome_banco: 'Itaú',
      agencia: '0010',
      conta: '9753',
      tipo: 'PJ',
      pix: '09556785680',
    },
    {
      id: '293701273923',
      id_funcionario: '29370127391',
      nome_banco: 'Itaú',
      agencia: '0010',
      conta: '9753',
      tipo: 'PJ',
      pix: '09556785680',
    },
  ])
}
