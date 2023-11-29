import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("alimentos_entrada").del();

  await knex("alimentos_entrada").insert([
    {
      id_alimento: 1,
      id_entrada: 1,
      quantidade: 100.0,
    },
    {
      id_alimento: 2,
      id_entrada: 2,
      quantidade: 150.0,
    },
    {
      id_alimento: 3,
      id_entrada: 3,
      quantidade: 200.0,
    },
  ]);
}
