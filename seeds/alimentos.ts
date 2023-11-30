import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('alimentos').del()

  await knex('alimentos').insert([
    {
      nome: 'Arroz',
      quantidade_em_estoque: 150,
      unidade_medida: 'kg',
    },
    {
      nome: 'Feijão',
      quantidade_em_estoque: 0,
      unidade_medida: 'kg',
    },
    {
      nome: 'Macarrão',
      quantidade_em_estoque: 0,
      unidade_medida: 'kg',
    },
  ])
}
