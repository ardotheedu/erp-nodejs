// src/routes/alimentos_saida.ts
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

export async function alimentosSaidaRoutes(app: FastifyInstance) {
  app.get(
    "/alimentos-saida",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      try {
        const alimentosSaida = await knex("alimentos_saida").select();
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
      try {
        const relatorioSaida = await knex("alimentos_saida")
          .join("alimentos", "alimentos.id", "alimentos_saida.id_alimento")
          .join("saida", "saida.id", "alimentos_saida.id_saida")
          .select(
            "alimentos.nome as NomeAlimento",
            "saida.data as DataSaida",
            "saida.hora as HoraSaida",
            "alimentos_saida.quantidade as QuantidadeSaida"
          );
        return reply.send(relatorioSaida);
      } catch (error) {
        console.error(error);
        return reply
          .status(500)
          .send({ error: "Erro ao gerar relatório de saída." });
      }
    }
  );

  app.post(
    "/alimentos-saida",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const saidaSchema = z.object({
        id_alimento: z.number(),
        id_saida: z.number(),
        quantidade: z.number(),
      });

      const result = saidaSchema.safeParse(request.body);
      if (!result.success) {
        return reply.status(400).send({ error: "Dados de entrada inválidos" });
      }

      try {
        const newId = await knex("alimentos_saida")
          .insert(result.data)
          .returning("id");
        return reply.status(201).send({ id: newId });
      } catch (error) {
        console.error(error);
        return reply
          .status(500)
          .send({ error: "Erro ao adicionar saída de alimentos." });
      }
    }
  );

  app.put(
    "/alimentos-saida/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const updateSaidaParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const updateSaidaBodySchema = z.object({
        id_alimento: z.number().optional(),
        id_saida: z.number().optional(),
        quantidade: z.number().optional(),
      });

      try {
        const params = updateSaidaParamsSchema.safeParse(request.params);
        if (!params.success) {
          return reply.status(400).send({ error: "ID inválido." });
        }

        const { id } = params.data;

        const body = updateSaidaBodySchema.safeParse(request.body);
        if (!body.success) {
          return reply
            .status(400)
            .send({ error: "Dados de entrada inválidos." });
        }

        const saidaInfo = await knex("alimentos_saida")
          .where({ ID: id })
          .first();
        if (!saidaInfo) {
          return reply.status(404).send("Saída de alimentos não encontrada.");
        }

        await knex("alimentos_saida").where({ ID: id }).update(body.data);

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply
          .status(500)
          .send("Erro ao atualizar a saída de alimentos.");
      }
    }
  );

  // DELETE para remover uma saída
  app.delete(
    "/alimentos-saida/:id",
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
        const saidaInfo = await knex("alimentos_saida")
          .where({ ID: id })
          .first();
        if (!saidaInfo) {
          return reply.status(404).send("Saída de alimentos não encontrada.");
        }

        await knex("alimentos_saida").where({ ID: id }).del();

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply.status(500).send("Erro ao excluir a saída de alimentos.");
      }
    }
  );
}
