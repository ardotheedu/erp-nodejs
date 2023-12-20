import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("unidade_medida").del();

  // Inserts seed entries
  await knex("unidade_medida").insert([
    { nome: "Quilograma", sigla: "kg" },
    { nome: "Grama", sigla: "g" },
    { nome: "Litro", sigla: "L" },
    { nome: "Mililitro", sigla: "ml" },
    { nome: "Unidade", sigla: "un" },
    { nome: "Dúzia", sigla: "dz" },
    { nome: "Pacote", sigla: "pc" },
    { nome: "Caixa", sigla: "cx" },
  ]);
}
