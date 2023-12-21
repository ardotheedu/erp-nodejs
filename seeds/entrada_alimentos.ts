import dayjs from "dayjs";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("entrada_alimentos").del();

  await knex("entrada_alimentos").insert([
    {
      alimento_id: "e4450af8-4e9f-4655-9e84-2b5291a81671",
      data_vencimento: dayjs("2023/07/22", "YYYY/MM/DD").format(),
      data_entrada: dayjs("2023/08/25", "YYYY/MM/DD").format(),
      quantidade: 100,
      unidade_medida_id: 1,
    },
    {
      alimento_id: "4c66077b-5bda-4f3b-a160-d9a0bba40fe0",
      data_vencimento: dayjs("2023/07/24", "YYYY/MM/DD").format(),
      data_entrada: dayjs("2023/09/25", "YYYY/MM/DD").format(),
      quantidade: 150,
      unidade_medida_id: 8,
    },
    {
      alimento_id: "01f88d7d-e366-42fa-887c-8ac983740279",
      data_vencimento: dayjs("2023/08/22", "YYYY/MM/DD").format(),
      data_entrada: dayjs("2023/09/25", "YYYY/MM/DD").format(),
      quantidade: 200,
      unidade_medida_id: 7,
    },
  ]);
}
