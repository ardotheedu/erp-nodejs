import { randomUUID } from "crypto";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("pedido").del();

  // Inserts seed entries
  await knex("pedido").insert([
    {
      id: randomUUID(),
      cliente_id_pedido: "1156",
      data_pedido: "2023-09-01",
      total: "15314.15",
      status_pagamento: "aprovado",
    },
    {
      id: randomUUID(),
      cliente_id_pedido: "5664",
      data_pedido: "2023-08-26",
      total: "714",
      status_pagamento: "cancelado",
    },
  ]);
}
