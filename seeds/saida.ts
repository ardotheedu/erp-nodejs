import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("saida").del();

  await knex("saida").insert([
    {
      data: new Date(),
      hora: "15:00",
    },
    {
      data: new Date(),
      hora: "16:00",
    },
    {
      data: new Date(),
      hora: "17:00",
    },
  ]);
}
