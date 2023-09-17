import { randomUUID } from "crypto";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("lancamento").del();

  await knex("lancamento").insert([
    {
      id: randomUUID(),
      id_nota: "233541231",
      data_vencimento: "23/07/2023",
      data_pagamento: "22/07/2023",
      valor: "243",
      metodo_pagamento: "Cartão de credito",
    },
    {
      id: randomUUID(),
      id_nota: "233541231",
      data_vencimento: "31/08/2023",
      data_pagamento: "30/08/2023",
      valor: "453",
      metodo_pagamento: "Cartão de débito",
    },
  ]);
}
