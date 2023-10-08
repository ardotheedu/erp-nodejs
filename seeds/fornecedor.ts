import { randomUUID } from "crypto";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("fornecedor").del();

  // Inserts seed entries
  await knex("fornecedor").insert([
    {
      id: "5981fb3f-cce8-444c-b6b7-cbd65db1b183",
      nome_fantasia: "fornecedor 1",
      cnpj: "29.026.649/0001-63",
      telefone: "99999999999",
      email: "fornecedor1@empresa.com",
      
    },
    {
        id: "1931a208-571e-4fb2-91ba-b807e2a5a122",
        nome_fantasia: "fornecedor 2",
        cnpj: "12.856.914/0001-38",
        telefone: "88888888888",
        email: "fornecedor2@empresa.com",
        
      },
  ]);
}
