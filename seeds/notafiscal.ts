import { randomUUID } from "crypto";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("notafiscal").del();

  await knex("notafiscal").insert([
    {
      id: randomUUID(),
      numero_nota: "12345678910",
    },
    {
      id: randomUUID(),
      numero_nota: "10987654321",
    },
    {
      id: randomUUID(),
      numero_nota: "5678901234",
    },
    {
      id: randomUUID(),
      numero_nota: "4321098765",
    },
    {
      id: randomUUID(),
      numero_nota: "9876543210",
    },
    {
      id: randomUUID(),
      numero_nota: "2468135790",
    },
    {
      id: randomUUID(),
      numero_nota: "1357924680",
    },
    {
      id: randomUUID(),
      numero_nota: "8642097531",
    },
    {
      id: randomUUID(),
      numero_nota: "1122334455",
    },
    {
      id: randomUUID(),
      numero_nota: "9988776655",
    },
  ]);
}

