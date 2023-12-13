// src/routes/alimentos_saida.ts
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

interface RelatorioQueryParams {
  data_vencimento?: string;
  data_entrada?: string;
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
          .join("alimentos", "alimentos.id", "saida_alimentos.id_alimento")
          .join(
            "unidades_medida",
            "unidades_medida.id",
            "saida_alimentos.unidade_medida_id"
          )
          .select(
            "alimentos.nome as NomeAlimento",
            "saida_alimentos.data_saida as DataSaida",
            "saida_alimentos.quantidade as QuantidadeSaida",
            "unidades_medida.sigla as UnidadeMedida"
          );

        if (queryParams.data_vencimento) {
          queryBuilder.where(
            "saida_alimentos.data_vencimento",
            queryParams.data_vencimento
          );
        }
        if (queryParams.data_saida) {
          queryBuilder.where(
            "saida_alimentos.data_saida",
            queryParams.data_saida
          );
        }
        if (queryParams.quantidade) {
          queryBuilder.where(
            "saida_alimentos.quantidade",
            queryParams.quantidade
          );
        }

        const relatorioSaida = await queryBuilder;
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
    "/",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const saidaSchema = z.object({
        id_alimento: z.string().uuid(),
        quantidade: z.number(),
        data_saida: z.string(),
        unidade_medida_id: z.number(),
      });

      const result = saidaSchema.safeParse(request.body);
      if (!result.success) {
        return reply.status(400).send({ error: "Dados de entrada inválidos" });
      }

      try {
        const newId = await knex("saida_alimentos")
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
    "/saida_alimentos/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const updateSaidaParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const updateSaidaBodySchema = z.object({
        id_alimento: z.string().uuid().optional(),
        quantidade: z.number().optional(),
        data_saida: z.string().optional(),
        unidade_medida_id: z.number().optional(),
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

  // DELETE para remover uma saída
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
