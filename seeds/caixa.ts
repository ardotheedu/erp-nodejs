import { Knex } from "knex";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("caixa").del();

  // Inserts seed entries
  await knex("caixa").insert([
    {
      abertura: dayjs('2023/07/22', 'YYYY/MM/DD').format(),
      fechamento: dayjs('2023/07/22', 'YYYY/MM/DD').format(),
      saldo_inicial: 1000.0,
      suprimento: 0.0,
      sangria: 0.0,
      saldo_atual: 1000.0,
      saldo_fechamento: null,
    },
    {
      abertura: dayjs('2023/07/20', 'YYYY/MM/DD').format(),
      fechamento: dayjs('2023/07/20', 'YYYY/MM/DD').format(),
      saldo_inicial: 1200.0,
      suprimento: 50.0,
      sangria: 30.0,
      saldo_atual: 1220.0,
      saldo_fechamento: 1190.0,
    },
    {
      abertura: dayjs('2023/07/26', 'YYYY/MM/DD').format(),
      fechamento: dayjs('2023/07/26', 'YYYY/MM/DD').format(),
      saldo_inicial: 1500.0,
      suprimento: 20.0,
      sangria: 10.0,
      saldo_atual: 1510.0,
      saldo_fechamento: 1490.0,
    },
    {
      abertura: dayjs('2023/08/29', 'YYYY/MM/DD').format(),
      fechamento: dayjs('2023/08/29', 'YYYY/MM/DD').format(),
      saldo_inicial: 800.0,
      suprimento: 60.0,
      sangria: 40.0,
      saldo_atual: 820.0,
      saldo_fechamento: 780.0,
    },
    {
      abertura: dayjs('2023/08/30', 'YYYY/MM/DD').format(),
      fechamento: dayjs('2023/08/30', 'YYYY/MM/DD').format(),
      saldo_inicial: 2000.0,
      suprimento: 70.0,
      sangria: 50.0,
      saldo_atual: 2020.0,
      saldo_fechamento: 1970.0,
    },
    {
      abertura: dayjs('2023/09/01', 'YYYY/MM/DD').format(),
      fechamento: dayjs('2023/09/01', 'YYYY/MM/DD').format(),
      saldo_inicial: 600.0,
      suprimento: 30.0,
      sangria: 20.0,
      saldo_atual: 610.0,
      saldo_fechamento: 590.0,
    },
    {
      abertura: dayjs('2023/09/21', 'YYYY/MM/DD').format(),
      fechamento: dayjs('2023/09/21', 'YYYY/MM/DD').format(),
      saldo_inicial: 1800.0,
      suprimento: 40.0,
      sangria: 15.0,
      saldo_atual: 1825.0,
      saldo_fechamento: 1805.0,
    },
    {
      abertura: dayjs('2023/09/22', 'YYYY/MM/DD').format(),
      fechamento: dayjs('2023/09/22', 'YYYY/MM/DD').format(),
      saldo_inicial: 950.0,
      suprimento: 25.0,
      sangria: 35.0,
      saldo_atual: 940.0,
      saldo_fechamento: 915.0,
    },
    {
      abertura: dayjs('2023/09/24', 'YYYY/MM/DD').format(),
      fechamento: dayjs('2023/09/24', 'YYYY/MM/DD').format(),
      saldo_inicial: 3000.0,
      suprimento: 10.0,
      sangria: 15.0,
      saldo_atual: 3000.0,
      saldo_fechamento: 945.0,
    },
    {
      abertura: dayjs('2023/10/01', 'YYYY/MM/DD').format(),
      fechamento: dayjs('2023/10/01', 'YYYY/MM/DD').format(),
      saldo_inicial: 1750.0,
      suprimento: 10.0,
      sangria: 5.0,
      saldo_atual: 1755.0,
      saldo_fechamento: 1750.0,
    },
  ]);
}
