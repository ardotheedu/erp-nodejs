import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("caixa").del();

  // Inserts seed entries
  await knex("caixa").insert([
    {
      abertura: new Date(),
      fechamento: null, //caixa aberto
      saldo_inicial: 1000.0,
      suprimento: 0.0,
      sangria: 0.0,
      saldo_atual: 1000.0,
      saldo_fechamento: null,
    },
  ]);
}
