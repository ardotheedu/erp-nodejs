import { randomUUID } from "crypto";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("venda_saida").del();

  // Inserts seed entries
  await knex("venda_saida").insert([
    {
      id: randomUUID(),
      pedido_id_venda: "555142645",
      data_saida: "2022-10-16",
      funcionario_id: "1454435",
      total_da_venda: "1532.58",
    },
    {
      id: randomUUID(),
      pedido_id_venda: "55542866537",
      data_saida: "2023-02-20",
      funcionario_id: "434564",
      total_da_venda: "361.44",
    },
  ]);
}
