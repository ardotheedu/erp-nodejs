import { Knex } from "knex";
import { randomUUID } from "node:crypto";

export async function seed(knex: Knex): Promise<void> {
  await knex("alimentos").del();

  await knex("alimentos").insert([
    {
      id: randomUUID(),
      nome: "Arroz",
      quantidade_em_estoque: 150,
      unidade_medida_id: 1,
    },
    {
      id: randomUUID(),
      nome: "Feijão",
      quantidade_em_estoque: 0,
      unidade_medida_id: 1,
    },
    {
      id: randomUUID(),
      nome: "Macarrão",
      quantidade_em_estoque: 0,
      unidade_medida_id: 7,
    },
  ]);
}
