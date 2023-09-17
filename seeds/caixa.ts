import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("caixa").del();

    // Inserts seed entries
    await knex("caixa").insert([
        {
            abertura: new Date(),
            fechamento: null,//caixa aberto
            saldo_inicial: 1000.00,
            suprimento: 0.00,
            sangria: 0.00,
            saldo_atual: 1000.00,
            saldo_fechamento: null
        },
    ]);
}

