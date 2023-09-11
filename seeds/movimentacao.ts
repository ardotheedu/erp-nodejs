import { randomUUID } from "crypto";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("movimentacao").del();

  // Inserts seed entries
  await knex("movimentacao").insert([
    {
      id: randomUUID(),
      nome: "movimentacao 2",
      descricao: "movimentacao 2",
      tipo_movimentacao: 'entrada',
      quantidade: 5,
      data_movimentacao: "2023-08-26",
      movimentacao_produto_id: "e4b9a2b4-e862-4cac-a41f-62bb12a6f990",
      
    },
    {
        id: randomUUID(),
        nome: "movimentacao 1",
        descricao: "movimentacao 1",
        tipo_movimentacao: 'saida',
        quantidade: 1,
        data_movimentacao: "2023-08-23",
        movimentacao_produto_id: "1593c78b-99f8-441c-b777-55878dfecca5",
        
      },
      {
        id: randomUUID(),
        nome: "movimentacao 3",
        descricao: "movimentacao 3",
        tipo_movimentacao: 'devolucao',
        quantidade: 3,
        data_movimentacao: "2023-08-28",
        movimentacao_produto_id: "e4b9a2b4-e862-4cac-a41f-62bb12a6f990",
        
      },
  ]);
}
