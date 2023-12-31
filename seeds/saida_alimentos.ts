import dayjs from "dayjs";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("saida_alimentos").del();

  await knex("saida_alimentos").insert([
    {
      alimento_id: "e4450af8-4e9f-4655-9e84-2b5291a81671",
      quantidade: 10,
      data_saida: dayjs("2023/07/22", "YYYY/MM/DD").format(),
      unidade_medida_id: 1,
    },
    {
      alimento_id: "e4450af8-4e9f-4655-9e84-2b5291a81671",
      quantidade: 20,
      data_saida: dayjs("2023/07/23", "YYYY/MM/DD").format(),
      unidade_medida_id: 1,
    },
    {
      alimento_id: "e4450af8-4e9f-4655-9e84-2b5291a81671",
      quantidade: 30,
      data_saida: dayjs("2023/07/24", "YYYY/MM/DD").format(),
      unidade_medida_id: 1,
    },
  ]);
}
