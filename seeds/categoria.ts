import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("categoria_produto").del();

  // Inserts seed entries
  await knex("categoria_produto").insert([
    {
      id: "949432ca-fb48-4b26-973a-60a0b87bb69a",
      nome: "categoria 1"
      
    },
    {
        id: "6d443323-aa21-40b2-8c0c-7d5c04693716",
        nome: "categoria 2"
        
      },
  ]);
}
