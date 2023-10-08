import { Knex } from "knex";
import { randomUUID } from "crypto";

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
      cpf_cnpj: "12345678901",
      tipo: "PF",
    },
    {
      id: randomUUID(),
      nome: "Selmara",
      email: "selmara@gmail.com",
      telefone: "7436111111",
      cpf_cnpj: "78945612355",
      tipo: "PF",
    },
  ]);
}
