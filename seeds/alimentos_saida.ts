import dayjs from 'dayjs'
import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('saida_alimentos').del()

  await knex('saida_alimentos').insert([
    {
      alimento_id: 1,
      quantidade: 10,
      data_saida: dayjs('22/07/2023', 'DD/MM/YYYY').format(),
    },
    {
      alimento_id: 2,
      quantidade: 20,
      data_saida: dayjs('23/07/2023', 'DD/MM/YYYY').format(),
    },
    {
      alimento_id: 3,
      quantidade: 30,
      data_saida: dayjs('24/07/2023', 'DD/MM/YYYY').format(),
    },
  ])
}
