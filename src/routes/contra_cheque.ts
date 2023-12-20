// src/routes/contra_cheque.ts
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";
import dayjs from "dayjs";

export async function contraChequeRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      try {
        const contraCheques = await knex("contra_cheque").select();
        return reply.send(contraCheques);
      } catch (error) {
        console.error(error);
        return reply
          .status(500)
          .send({ error: "Erro ao buscar contracheques." });
      }
    }
  );

  app.post(
    "/",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const contraChequeSchema = z.object({
        id_funcionario: z.string().uuid(),
        remuneracao_principal: z.number(),
        comissao: z.number(),
        impostos: z.number(),
        data_emissao: z.string(),
      });

      const result = contraChequeSchema.safeParse(request.body);
      if (!result.success) {
        return reply.status(400).send({ error: "Dados de entrada inválidos" });
      }

      try {
        const newId = await knex("contra_cheque")
          .insert({
            ...result.data,
            data_emissao: dayjs(result.data.data_emissao).format("YYYY-MM-DD"),
          })
          .returning("id");
        return reply.status(201).send({ id: newId });
      } catch (error) {
        console.error(error);
        return reply
          .status(500)
          .send({ error: "Erro ao adicionar contracheque." });
      }
    }
  );
  app.put(
    "/contra_cheque/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const updateContraChequeParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const updateContraChequeBodySchema = z.object({
        id_funcionario: z.string().uuid().optional(),
        remuneracao_principal: z.number().optional(),
        comissao: z.number().optional(),
        impostos: z.number().optional(),
        data_emissao: z.string().optional(),
      });

      try {
        const params = updateContraChequeParamsSchema.safeParse(request.params);
        if (!params.success) {
          return reply.status(400).send({ error: "ID inválido." });
        }

        const { id } = params.data;

        const body = updateContraChequeBodySchema.safeParse(request.body);
        if (!body.success) {
          return reply
            .status(400)
            .send({ error: "Dados de entrada inválidos." });
        }

        const contraChequeInfo = await knex("contra_cheque")
          .where({ id })
          .first();
        if (!contraChequeInfo) {
          return reply.status(404).send("Contracheque não encontrado.");
        }

        await knex("contra_cheque").where({ id }).update(body.data);

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply.status(500).send("Erro ao atualizar o contracheque.");
      }
    }
  );
  app.delete(
    "/contra_cheque/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const deleteContraChequeParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const params = deleteContraChequeParamsSchema.safeParse(request.params);
      if (!params.success) {
        return reply.status(400).send({ error: "ID inválido." });
      }

      const { id } = params.data;

      try {
        const contraChequeInfo = await knex("contra_cheque")
          .where({ id })
          .first();
        if (!contraChequeInfo) {
          return reply.status(404).send("Contracheque não encontrado.");
        }

        await knex("contra_cheque").where({ id }).del();

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply.status(500).send("Erro ao excluir o contracheque.");
      }
    }
  );
}
