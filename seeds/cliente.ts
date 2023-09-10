import { randomUUID } from "crypto";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cliente").del();

  // Inserts seed entries
  await knex("cliente").insert([
    {
      id: randomUUID(),
      nome: "Italo",
      email: "italo@gmail.com",
      telefone: "74988888888",
      cpf: "12345678901",
    },
    {
      id: randomUUID(),
      nome: "Selmara",
      email: "selmara@gmail.com",
      telefone: "7436111111",
      cpf: "78945612355",
    },
  ]);
}
