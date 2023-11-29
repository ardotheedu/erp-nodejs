// seeds/entrada_seed.js
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("entrada").del();

  await knex("entrada").insert([
    {
      data: new Date(),
      hora: "08:00",
    },
    {
      data: new Date(),
      hora: "09:00",
    },
    {
      data: new Date(),
      hora: "10:00",
    },
  ]);
}
