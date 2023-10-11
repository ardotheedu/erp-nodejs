import { Knex } from 'knex'
import { randomUUID } from 'crypto'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('cliente').del()

  // Inserts seed entries
  await knex('cliente').insert([
    {
      id: randomUUID(),
      nome: 'André',
      email: 'andre@gmail.com',
      telefone: '74955555555',
      cpf_cnpj: '98765432109',
      tipo: 'PF',
    },
    {
      id: randomUUID(),
      nome: 'Luciana',
      email: 'luciana@gmail.com',
      telefone: '7436222222',
      cpf_cnpj: '65478932145',
      tipo: 'PF',
    },
    {
      id: randomUUID(),
      nome: 'Carlos',
      email: 'carlos@gmail.com',
      telefone: '74944444444',
      cpf_cnpj: '78912345678',
      tipo: 'PF',
    },
    {
      id: randomUUID(),
      nome: 'Patrícia',
      email: 'patricia@gmail.com',
      telefone: '7436333333',
      cpf_cnpj: '45698712332',
      tipo: 'PF',
    },
    {
      id: randomUUID(),
      nome: 'Fernando',
      email: 'fernando@gmail.com',
      telefone: '74933333333',
      cpf_cnpj: '12378945601',
      tipo: 'PF',
    },
    {
      id: randomUUID(),
      nome: 'Beatriz',
      email: 'beatriz@gmail.com',
      telefone: '7436444444',
      cpf_cnpj: '78965432145',
      tipo: 'PF',
    },
    {
      id: randomUUID(),
      nome: 'Paulo',
      email: 'paulo@gmail.com',
      telefone: '74922222222',
      cpf_cnpj: '98712345678',
      tipo: 'PF',
    },
    {
      id: randomUUID(),
      nome: 'Sandra',
      email: 'sandra@gmail.com',
      telefone: '7436555555',
      cpf_cnpj: '65432178901',
      tipo: 'PF',
    },
    {
      id: randomUUID(),
      nome: 'Márcio',
      email: 'marcio@gmail.com',
      telefone: '74911111111',
      cpf_cnpj: '12345678901',
      tipo: 'PF',
    },
    {
      id: randomUUID(),
      nome: 'Isabela',
      email: 'isabela@gmail.com',
      telefone: '7436666666',
      cpf_cnpj: '78945612355',
      tipo: 'PF',
    },
  ])
}
