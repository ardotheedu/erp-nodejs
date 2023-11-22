import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { knex } from "../database";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

export async function caixaRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      try {
        const caixaInfo = await knex("caixa").select();
        return { caixaInfo };
      } catch (error) {
        console.error(error);
        return { error: "Erro ao buscar informações do caixa." };
      }
    }
  );

  const querySchema = z.object({
    dataInicio: z
      .string()
      .refine((data) => dayjs(data, "DD/MM/YYYY", true).isValid(), {
        message: "dataInicio deve estar no formato DD/MM/YYYY",
      }),
    dataFim: z
      .string()
      .refine((data) => dayjs(data, "DD/MM/YYYY", true).isValid(), {
        message: "dataFim deve estar no formato DD/MM/YYYY",
      }),
  });

  // Rota para buscar caixas por intervalo de datas
  app.get(
    "/caixaPorPeriodo",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      // Valida os parâmetros de consulta com o esquema definido
      const validationResult = querySchema.safeParse(request.query);

      // Verifica se a validação foi bem-sucedida
      if (!validationResult.success) {
        return reply
          .status(400)
          .send({ error: "Parâmetros de consulta inválidos" });
      }

      // Extrai e formata as datas usando dayjs para o formato local
      const { dataInicio, dataFim } = validationResult.data;
      const formattedDataInicio = dayjs(dataInicio, "DD/MM/YYYY").format();
      const formattedDataFim = dayjs(dataFim, "DD/MM/YYYY").format();

      try {
        // Realiza a consulta ao banco de dados usando os valores formatados
        const caixas = await knex("caixa")
          .where("abertura", ">=", formattedDataInicio)
          .andWhere("abertura", "<=", formattedDataFim)
          .select(
            "abertura",
            "fechamento",
            "saldo_inicial",
            "suprimento",
            "sangria",
            "saldo_atual",
            "saldo_fechamento"
          );

        // Retorna os resultados da consulta
        return reply.send(caixas);
      } catch (error) {
        // Trata erros durante a consulta ao banco de dados
        console.error(error);
        return reply
          .status(500)
          .send("Erro ao buscar caixas no intervalo de datas especificado.");
      }
    }
  );

  app.post("/", async (request, reply) => {
    const createCaixaBodySchema = z.object({
      abertura: z.coerce.date(),
      fechamento: z.union([z.coerce.date().optional(), z.null()]),
      saldo_inicial: z.number(),
      suprimento: z.union([z.number().optional(), z.null()]),
      sangria: z.union([z.number().optional(), z.null()]),
      saldo_atual: z.number(),
      saldo_fechamento: z.union([z.number().optional(), z.null()]),
    });

    const {
      abertura,
      fechamento,
      saldo_inicial,
      suprimento,
      sangria,
      saldo_atual,
      saldo_fechamento,
    } = createCaixaBodySchema.parse(request.body);

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      reply.setCookie("sessionId", sessionId, {
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
    }

    const ID = randomUUID();

    await knex("caixa").insert({
      ID,
      abertura,
      fechamento,
      saldo_inicial,
      suprimento,
      sangria,
      saldo_atual,
      saldo_fechamento,
    });

    return reply.status(201).send({});
  });

  // Rota para atualizar informações do caixa por ID (PUT)
  app.put(
    "/caixa/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const updateCaixaParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const updateCaixaBodySchema = z.object({
        abertura: z.date(),
        fechamento: z.date().optional().nullable(),
        saldo_inicial: z.number(),
        suprimento: z.number().optional().nullable(),
        sangria: z.number().optional().nullable(),
        saldo_atual: z.number(),
        saldo_fechamento: z.number().optional().nullable(),
      });

      try {
        const params = updateCaixaParamsSchema.safeParse(request.params);
        if (!params.success) {
          return reply.status(400).send({ error: "ID inválido." });
        }

        const { id } = params.data;

        const body = updateCaixaBodySchema.safeParse(request.body);
        if (!body.success) {
          return reply
            .status(400)
            .send({ error: "Dados de entrada inválidos." });
        }

        const caixaInfo = await knex("caixa").where({ ID: id }).first();
        if (!caixaInfo) {
          return reply
            .status(404)
            .send("Informações do caixa não encontradas.");
        }

        await knex("caixa").where({ ID: id }).update(body.data);

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply
          .status(500)
          .send("Erro ao atualizar as informações do caixa.");
      }
    }
  );

  // Rota para excluir informações do caixa por ID (DELETE)
  app.delete(
    "/caixa/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const deleteCaixaParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const params = deleteCaixaParamsSchema.safeParse(request.params);
      if (!params.success) {
        return reply.status(400).send({ error: "ID inválido." });
      }

      const { id } = params.data;

      try {
        // Verifica se o ID existe antes de excluir
        const caixaInfo = await knex("caixa").where({ ID: id }).first();

        if (!caixaInfo) {
          return reply
            .status(404)
            .send("Informações do caixa não encontradas.");
        }

        await knex("caixa").where({ ID: id }).del();

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply
          .status(500)
          .send("Erro ao excluir as informações do caixa.");
      }
    }
  );
}
