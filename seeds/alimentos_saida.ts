import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("alimentos_saida").del();

  await knex("alimentos_saida").insert([
    {
      id_alimento: 1,
      id_saida: 1,
      quantidade: 10.0,
    },
    {
      id_alimento: 2,
      id_saida: 2,
      quantidade: 20.0,
    },
    {
      id_alimento: 3,
      id_saida: 3,
      quantidade: 30.0,
    },
  ]);
}
