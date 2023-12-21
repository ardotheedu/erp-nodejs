// seeds/alimentos.ts
import { Knex } from "knex";
import { randomUUID } from "node:crypto";

export async function seed(knex: Knex): Promise<void> {
  await knex("alimentos").del();

  await knex("alimentos").insert([
    {
      id: "e4450af8-4e9f-4655-9e84-2b5291a81671",
      nome: "Arroz",
      quantidade: 150,
      unidade_medida_id: 1,
    },
    {
      id: "4c66077b-5bda-4f3b-a160-d9a0bba40fe0",
      nome: "Feijão",
      quantidade: 100,
      unidade_medida_id: 1,
    },
    {
      id: "01f88d7d-e366-42fa-887c-8ac983740279",
      nome: "Macarrão",
      quantidade: 100,
      unidade_medida_id: 7,
    },
  ]);
}
