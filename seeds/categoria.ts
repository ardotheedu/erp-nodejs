import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("categoria_produto").del();

  // Inserts seed entries
  await knex("categoria_produto").insert([
    {
      id: "949432ca-fb48-4b26-973a-60a0b87bb69a",
      nome: "categoria 1",
    },
    {
      id: "6d443323-aa21-40b2-8c0c-7d5c04693716",
      nome: "categoria 2",
    },
    {
      id: "3e87d6a2-6a14-4e5f-85df-8c0a9d1f8c56",
      nome: "categoria 3",
    },
    {
      id: "f8a975b9-9e07-4937-8d1e-276c2c15680a",
      nome: "categoria 4",
    },
    {
      id: "27d69d48-4b7a-45e7-9b8f-1f5b10150b33",
      nome: "categoria 5",
    },
    {
      id: "c55bbd8b-c8da-4b88-83ce-9815be95369a",
      nome: "categoria 6",
    },
    {
      id: "a8e56b31-184f-42db-980d-ec962c5d52c5",
      nome: "categoria 7",
    },
    {
      id: "8f69d7e5-2a9d-4f68-a773-0e61b32f5a62",
      nome: "categoria 8",
    },
    {
      id: "1e68241f-7cf2-4a18-ba11-2e5d44a8d732",
      nome: "categoria 9",
    },
    {
      id: "27c5b77e-764d-4686-b845-84c7a4b69447",
      nome: "categoria 10",
    },
  ]);
}
