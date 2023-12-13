import dayjs from "dayjs";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("entrada_alimentos").del();

  await knex("entrada_alimentos").insert([
    {
      alimento_id: 1,
      data_vencimento: dayjs("2023/07/22", "YYYY/MM/DD").format(),
      data_entrada: dayjs("2023/08/25", "YYYY/MM/DD").format(),
      quantidade: 100,
      unidade_medida_id: 1,
    },
    {
      alimento_id: 2,
      data_vencimento: dayjs("2023/07/24", "YYYY/MM/DD").format(),
      data_entrada: dayjs("2023/09/25", "YYYY/MM/DD").format(),
      quantidade: 150,
      unidade_medida_id: 8,
    },
    {
      alimento_id: 3,
      data_vencimento: dayjs("2023/08/22", "YYYY/MM/DD").format(),
      data_entrada: dayjs("2023/09/25", "YYYY/MM/DD").format(),
      quantidade: 200,
      unidade_medida_id: 7,
    },
  ]);
}
