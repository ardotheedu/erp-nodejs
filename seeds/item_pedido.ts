import { randomUUID } from "crypto";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("item_pedido").del();

  // Inserts seed entries
  await knex("item_pedido").insert([
    {
      id: randomUUID(),
      pedido_id_item: "115644525415",
      produto_id: "556874526",
      quantidade: "7",
      preco_unitario: "44.72",
    },
    {
      id: randomUUID(),
      pedido_id_item: "75615754174",
      produto_id: "412746524",
      quantidade: "26",
      preco_unitario: "17.45",
    },
  ]);
}
