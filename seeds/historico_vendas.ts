import { randomUUID } from 'crypto';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('historico_vendas').del();

  // Inserts seed entries
  await knex('historico_vendas').insert([
    {
      id: randomUUID(),
      venda_saida_id: '1',
      data: '2023-05-11',
      descricao: 'Venda processada com sucesso',
      valor: '764.32',
    },
    {
      id: randomUUID(),
      venda_saida_id: '2',
      data: '2023-06-16',
      descricao: 'Venda processada com sucesso',
      valor: '432.18',
    },
  ]);
}
