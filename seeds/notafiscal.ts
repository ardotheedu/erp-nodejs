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
  ]);
}
