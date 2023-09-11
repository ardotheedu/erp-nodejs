import { randomUUID } from "crypto";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("fornecedor_produto").del();

  // Inserts seed entries
  await knex("fornecedor_produto").insert([
    {
      id: randomUUID(),
      fornecedor_id: "5981fb3f-cce8-444c-b6b7-cbd65db1b183",
      produto_id: "e4b9a2b4-e862-4cac-a41f-62bb12a6f990",
      
      
    },
    {
        id: randomUUID(),
        fornecedor_id: "1931a208-571e-4fb2-91ba-b807e2a5a122",
        produto_id: "1593c78b-99f8-441c-b777-55878dfecca5",
        
        
      },
  ]);
}
