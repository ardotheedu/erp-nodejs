import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("alimentos").del();

  await knex("alimentos").insert([
    {
      nome: "Arroz",
      quantidade: 150.0,
      unidade_medida: "kg",
      data: new Date(),
      hora: "12:00",
      validade: "2024-01-01",
    },
    {
      nome: "Feijão",
      quantidade: 200.0,
      unidade_medida: "kg",
      data: new Date(),
      hora: "13:00",
      validade: "2024-02-01",
    },
    {
      nome: "Macarrão",
      quantidade: 100.0,
      unidade_medida: "kg",
      data: new Date(),
      hora: "14:00",
      validade: "2024-03-01",
    },
  ]);
}
