// src/routes/alimentos_entrada.ts
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";
import dayjs from "dayjs";
import { randomUUID } from "node:crypto";

interface RelatorioQueryParams {
  data_vencimento?: string;
  data_entrada?: string;
  data_saida?: string;
  quantidade?: number;
}

export async function entradaAlimentosRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      try {
        const alimentosEntrada = await knex("entrada_alimentos").select();
        return reply.send(alimentosEntrada);
      } catch (error) {
        console.error(error);
        return reply
          .status(500)
          .send({ error: "Erro ao buscar entradas de alimentos." });
      }
    }
  );

  app.get(
    "/relatorio-entrada",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const queryParams = request.query as RelatorioQueryParams;

      try {
        const queryBuilder = knex("entrada_alimentos")
          .leftJoin(
            "alimentos",
            "alimentos.id",
            "entrada_alimentos.alimento_id"
          )
          .leftJoin(
            "unidade_medida",
            "unidade_medida.id",
            "entrada_alimentos.unidade_medida_id"
          )
          .select(
            "alimentos.nome as NomeAlimento",
            "entrada_alimentos.data_entrada as DataEntrada",
            "entrada_alimentos.data_vencimento as DataVencimento",
            "entrada_alimentos.quantidade as QuantidadeEntrada",
            "unidade_medida.sigla as UnidadeMedida"
          );

        const relatorioEntrada = await queryBuilder;

        console.log("Query Results:", relatorioEntrada);

        return reply.send(relatorioEntrada);
      } catch (error) {
        console.error("Error executing query:", error);
        return reply
          .status(500)
          .send({ error: "Erro ao gerar relatório de entrada." });
      }
    }
  );

  app.post("/", async (request, reply) => {
    const createEntradaSchema = z.object({
      nome: z.string(),
      data_vencimento: z.coerce.date(),
      data_entrada: z.coerce.date(),
      quantidade: z
        .string()
        .refine((value) => !isNaN(Number(value)))
        .transform(Number),
      unidade_medida_id: z
        .string()
        .refine((value) => !isNaN(Number(value)))
        .transform(Number),
    });

    try {
      const {
        nome,
        data_vencimento,
        data_entrada,
        quantidade,
        unidade_medida_id,
      } = createEntradaSchema.parse(request.query);

      // Convertendo milissegundos para objetos de data usando Day.js
      const dataVencimentoObj = dayjs(data_vencimento);
      const dataEntradaObj = dayjs(data_entrada);

      console.log("Parsed Values:", {
        nome,
        data_vencimento: dataVencimentoObj.toISOString(), // Convertendo para ISO
        data_entrada: dataEntradaObj.toISOString(), // Convertendo para ISO
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

      // Inserir na tabela alimentos com ID gerado aleatoriamente
      const alimentoId = randomUUID();
      await knex("alimentos").insert({
        id: alimentoId,
        nome,
        quantidade,
        unidade_medida_id,
      });

      // Inserir na tabela entrada_alimentos
      await knex("entrada_alimentos").insert({
        alimento_id: alimentoId,
        data_vencimento: dataVencimentoObj.toISOString(), // Convertendo para ISO
        data_entrada: dataEntradaObj.toISOString(), // Convertendo para ISO
        quantidade,
        unidade_medida_id,
      });

      console.log("Entry Added Successfully.");

      return reply.status(201).send({});
    } catch (error) {
      console.error("Error Adding Entry:", error);
      return reply
        .status(500)
        .send({ error: "Erro ao adicionar entrada de alimentos." });
    }
  });

  // PUT para atualizar uma entrada existente
  app.put(
    "/entrada_alimentos/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const updateEntradaParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const updateEntradaBodySchema = z.object({
        id_alimento: z.string().uuid(),
        data_vencimento: z.string(),
        data_entrada: z.string(),
        quantidade: z.number(),
        unidade_medida_id: z.number(),
      });

      try {
        const params = updateEntradaParamsSchema.safeParse(request.params);
        if (!params.success) {
          return reply.status(400).send({ error: "ID inválido." });
        }

        const { id } = params.data;

        const body = updateEntradaBodySchema.safeParse(request.body);
        if (!body.success) {
          return reply
            .status(400)
            .send({ error: "Dados de entrada inválidos." });
        }

        const entradaInfo = await knex("entrada_alimentos")
          .where({ ID: id })
          .first();
        if (!entradaInfo) {
          return reply.status(404).send("Entrada de alimentos não encontrada.");
        }

        await knex("entrada_alimentos").where({ ID: id }).update(body.data);

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply
          .status(500)
          .send("Erro ao atualizar a entrada de alimentos.");
      }
    }
  );

  app.delete(
    "/entrada_alimentos/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const deleteEntradaParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const params = deleteEntradaParamsSchema.safeParse(request.params);
      if (!params.success) {
        return reply.status(400).send({ error: "ID inválido." });
      }

      const { id } = params.data;

      try {
        const entradaInfo = await knex("entrada_alimentos")
          .where({ ID: id })
          .first();
        if (!entradaInfo) {
          return reply.status(404).send("Entrada de alimentos não encontrada.");
        }

        await knex("entrada_alimentos").where({ ID: id }).del();

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply
          .status(500)
          .send("Erro ao excluir a entrada de alimentos.");
      }
    }
  );
}
