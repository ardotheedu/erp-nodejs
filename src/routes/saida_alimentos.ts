// src/routes/alimentos_saida.ts
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";
import dayjs from "dayjs";
import { randomUUID } from "node:crypto";

interface RelatorioQueryParams {
  data_saida?: string;
  quantidade?: number;
}

export async function saidaAlimentosRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      try {
        const alimentosSaida = await knex("saida_alimentos").select();
        return reply.send(alimentosSaida);
      } catch (error) {
        console.error(error);
        return reply
          .status(500)
          .send({ error: "Erro ao buscar saídas de alimentos." });
      }
    }
  );

  app.get(
    "/relatorio-saida",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const queryParams = request.query as RelatorioQueryParams;

      try {
        const queryBuilder = knex("saida_alimentos")
          .leftJoin("alimentos", "alimentos.id", "saida_alimentos.alimento_id")
          .leftJoin(
            "unidade_medida",
            "unidade_medida.id",
            "saida_alimentos.unidade_medida_id"
          )
          .select(
            "alimentos.nome as NomeAlimento",
            "saida_alimentos.data_saida as DataSaida",
            "saida_alimentos.quantidade as QuantidadeSaida",
            "unidade_medida.sigla as UnidadeMedida"
          );

        if (queryParams.data_saida) {
          queryBuilder.where(
            "saida_alimentos.data_saida",
            "=",
            queryParams.data_saida
          );
        }

        if (queryParams.quantidade) {
          queryBuilder.where(
            "saida_alimentos.quantidade",
            "=",
            queryParams.quantidade
          );
        }

        const relatorioSaida = await queryBuilder;

        console.log("Query Results:", relatorioSaida);

        return reply.send(relatorioSaida);
      } catch (error) {
        console.error("Error executing query:", error);
        return reply
          .status(500)
          .send({ error: "Erro ao gerar relatório de saída." });
      }
    }
  );

  app.post("/", async (request, reply) => {
    const createSaidaSchema = z.object({
      alimento_id: z.string().uuid(),
      data_saida: z.coerce.date(),
      quantidade: z.number().refine((value) => !isNaN(value) && value > 0),
      unidade_medida_id: z
        .number()
        .refine((value) => !isNaN(value) && value > 0),
    });

    try {
      const { alimento_id, data_saida, quantidade, unidade_medida_id } =
        createSaidaSchema.parse(request.body);

      // Convertendo milissegundos para objetos de data usando Day.js
      const dataSaidaObj = dayjs(data_saida);

      console.log("Parsed Values:", {
        alimento_id,
        data_saida: dataSaidaObj.toISOString(), // Convertendo para ISO
        quantidade,
        unidade_medida_id,
      });

      let sessionId = request.cookies.sessionId;

      if (!sessionId) {
        sessionId = randomUUID();

        reply.setCookie("sessionId", sessionId, {
          path: "/",
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
      }

      // Inserir na tabela saida_alimentos
      await knex("saida_alimentos").insert({
        alimento_id,
        data_saida: dataSaidaObj.toISOString(), // Convertendo para ISO
        quantidade,
        unidade_medida_id,
      });

      console.log("Exit Added Successfully.");

      return reply.status(201).send({});
    } catch (error) {
      console.error("Error Adding Exit:", error);
      return reply
        .status(500)
        .send({ error: "Erro ao adicionar saída de alimentos." });
    }
  });

  // PUT para atualizar uma saída existente
  app.put(
    "/saida_alimentos/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const updateSaidaParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const updateSaidaBodySchema = z.object({
        id_alimento: z.string().uuid(),
        data_saida: z.string(),
        quantidade: z.number(),
        unidade_medida_id: z.number(),
      });

      try {
        const params = updateSaidaParamsSchema.safeParse(request.params);
        if (!params.success) {
          return reply.status(400).send({ error: "ID inválido." });
        }

        const { id } = params.data;

        const body = updateSaidaBodySchema.safeParse(request.body);
        if (!body.success) {
          return reply.status(400).send({ error: "Dados de saída inválidos." });
        }

        const saidaInfo = await knex("saida_alimentos")
          .where({ ID: id })
          .first();
        if (!saidaInfo) {
          return reply.status(404).send("Saída de alimentos não encontrada.");
        }

        await knex("saida_alimentos").where({ ID: id }).update(body.data);

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply
          .status(500)
          .send("Erro ao atualizar a saída de alimentos.");
      }
    }
  );

  app.delete(
    "/saida_alimentos/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const deleteSaidaParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const params = deleteSaidaParamsSchema.safeParse(request.params);
      if (!params.success) {
        return reply.status(400).send({ error: "ID inválido." });
      }

      const { id } = params.data;

      try {
        const saidaInfo = await knex("saida_alimentos")
          .where({ ID: id })
          .first();
        if (!saidaInfo) {
          return reply.status(404).send("Saída de alimentos não encontrada.");
        }

        await knex("saida_alimentos").where({ ID: id }).del();

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply.status(500).send("Erro ao excluir a saída de alimentos.");
      }
    }
  );
}
