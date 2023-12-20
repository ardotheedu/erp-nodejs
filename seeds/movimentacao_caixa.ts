import { randomUUID } from 'crypto';
import { Knex } from 'knex';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export async function seed(knex: Knex): Promise<void> {
  // Deleta TODAS as entradas existentes
  await knex('movimentacao_caixa').del();

  // Insere entradas manualmente
  await knex('movimentacao_caixa').insert([
    {
      id: randomUUID(),
      timestamp: dayjs('2023/03/15', 'YYYY/MM/DD').format(),
      tipo: 'entrada',
      valor: 100.00,
    },
    {
      id: randomUUID(),
      timestamp: dayjs('2023/03/20', 'YYYY/MM/DD').format(),
      tipo: 'saida',
      valor: 50.00,
    },
    {
      id: randomUUID(),
      timestamp: dayjs('2023/03/22', 'YYYY/MM/DD').format(),
      tipo: 'devolucao',
      valor: 25.00,
    },
    {
      id: randomUUID(),
      timestamp: dayjs('2023/03/25', 'YYYY/MM/DD').format(),
      tipo: 'entrada',
      valor: 75.00,
    },
    {
      id: randomUUID(),
      timestamp: dayjs('2023/03/28', 'YYYY/MM/DD').format(),
      tipo: 'saida',
      valor: 30.00,
    },
    {
      id: randomUUID(),
      timestamp: dayjs('2023/04/02', 'YYYY/MM/DD').format(),
      tipo: 'devolucao',
      valor: 15.00,
    },
    {
      id: randomUUID(),
      timestamp: dayjs('2023/04/05', 'YYYY/MM/DD').format(),
      tipo: 'entrada',
      valor: 120.00,
    },
    {
      id: randomUUID(),
      timestamp: dayjs('2023/04/10', 'YYYY/MM/DD').format(),
      tipo: 'saida',
      valor: 60.00,
    },
    {
      id: randomUUID(),
      timestamp: dayjs('2023/04/15', 'YYYY/MM/DD').format(),
      tipo: 'entrada',
      valor: 90.00,
    },
    {
      id: randomUUID(),
      timestamp: dayjs('2023/04/20', 'YYYY/MM/DD').format(),
      tipo: 'saida',
      valor: 45.00,
    },
  ]);
}

