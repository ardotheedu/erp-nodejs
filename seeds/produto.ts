import { randomUUID } from "crypto";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("produto").del();

  // Inserts seed entries
  await knex("produto").insert([
    {
      id: "e4b9a2b4-e862-4cac-a41f-62bb12a6f990",
      nome: "produto 1",
      descricao: "descrição produto 1",
      preco_unitario: 10.00,
      preco_venda: 15.00,
      quantidade: 5,
      data_validade: "2023-08-26",
      lote: "lote12345ABC",
      produto_categoria_id: "949432ca-fb48-4b26-973a-60a0b87bb69a",
      
    },
    {
        id: "1593c78b-99f8-441c-b777-55878dfecca5",
        nome: "produto 2",
        descricao: "descrição produto 2",
        preco_unitario: 10.00,
        preco_venda: 15.00,
        quantidade: 5,
        data_validade: "2023-08-26",
        lote: "lote12345ABC",
        produto_categoria_id: "6d443323-aa21-40b2-8c0c-7d5c04693716",
        
      },
  ]);
}
