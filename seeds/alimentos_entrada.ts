import dayjs from 'dayjs'
import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('entrada_alimentos').del()

  await knex('entrada_alimentos').insert([
    {
      alimento_id: 1,
      data_vencimento: dayjs('22/07/2023', 'DD/MM/YYYY').format(),
      data_entrada: dayjs('25/08/2023', 'DD/MM/YYYY').format(),
      quantidade: 100,
    },
    {
      alimento_id: 2,
      data_vencimento: dayjs('24/07/2023', 'DD/MM/YYYY').format(),
      data_entrada: dayjs('25/09/2023', 'DD/MM/YYYY').format(),
      quantidade: 150,
    },
    {
      alimento_id: 3,
      data_vencimento: dayjs('22/08/2023', 'DD/MM/YYYY').format(),
      data_entrada: dayjs('25/09/2023', 'DD/MM/YYYY').format(),
      quantidade: 200,
    },
  ])
}
