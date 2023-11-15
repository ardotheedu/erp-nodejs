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
      timestamp: dayjs('15/03/2023', 'DD/MM/YYYY').format(),
      tipo: 'entrada',
      valor: 100.00,
    },
    {
      id: randomUUID(),
      timestamp: dayjs('20/03/2023', 'DD/MM/YYYY').format(),
      tipo: 'saida',
      valor: 50.00,
    },
    {
      id: randomUUID(),
      timestamp: dayjs('22/03/2023', 'DD/MM/YYYY').format(),
      tipo: 'devolucao',
      valor: 25.00,
    },
    {
      id: randomUUID(),
      timestamp: dayjs('25/03/2023', 'DD/MM/YYYY').format(),
      tipo: 'entrada',
      valor: 75.00,
    },
    {
      id: randomUUID(),
      timestamp: dayjs('28/03/2023', 'DD/MM/YYYY').format(),
      tipo: 'saida',
      valor: 30.00,
    },
    {
      id: randomUUID(),
      timestamp: dayjs('02/04/2023', 'DD/MM/YYYY').format(),
      tipo: 'devolucao',
      valor: 15.00,
    },
    {
      id: randomUUID(),
      timestamp: dayjs('05/04/2023', 'DD/MM/YYYY').format(),
      tipo: 'entrada',
      valor: 120.00,
    },
    {
      id: randomUUID(),
      timestamp: dayjs('10/04/2023', 'DD/MM/YYYY').format(),
      tipo: 'saida',
      valor: 60.00,
    },
    {
      id: randomUUID(),
      timestamp: dayjs('15/04/2023', 'DD/MM/YYYY').format(),
      tipo: 'entrada',
      valor: 90.00,
    },
    {
      id: randomUUID(),
      timestamp: dayjs('20/04/2023', 'DD/MM/YYYY').format(),
      tipo: 'saida',
      valor: 45.00,
    },
  ]);
}

