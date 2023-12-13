// src/routes/alimentos_entrada.ts
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
          .join("alimentos", "alimentos.id", "entrada_alimentos.id_alimento")
          .join(
            "unidades_medida",
            "unidades_medida.id",
            "entrada_alimentos.unidade_medida_id"
          )
          .select(
            "alimentos.nome as NomeAlimento",
            "entrada_alimentos.data_entrada as DataEntrada",
            "entrada_alimentos.quantidade as QuantidadeEntrada",
            "unidades_medida.sigla as UnidadeMedida"
          );

        if (queryParams.data_vencimento) {
          queryBuilder.where(
            "entrada_alimentos.data_vencimento",
            queryParams.data_vencimento
          );
        }
        if (queryParams.data_entrada) {
          queryBuilder.where(
            "entrada_alimentos.data_entrada",
            queryParams.data_entrada
          );
        }
        if (queryParams.quantidade) {
          queryBuilder.where(
            "entrada_alimentos.quantidade",
            queryParams.quantidade
          );
        }

        const relatorioEntrada = await queryBuilder;
        return reply.send(relatorioEntrada);
      } catch (error) {
        console.error(error);
        return reply
          .status(500)
          .send({ error: "Erro ao gerar relatório de entrada." });
      }
    }
  );

  app.post(
    "/",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const entradaSchema = z.object({
        id_alimento: z.string().uuid(),
        data_vencimento: z.string(),
        data_entrada: z.string(),
        quantidade: z.number(),
        unidade_medida_id: z.number(),
      });

      const result = entradaSchema.safeParse(request.body);
      if (!result.success) {
        return reply.status(400).send({ error: "Dados de entrada inválidos" });
      }

      try {
        const newId = await knex("alimentos_entrada")
          .insert(result.data)
          .returning("id");
        return reply.status(201).send({ id: newId });
      } catch (error) {
        console.error(error);
        return reply
          .status(500)
          .send({ error: "Erro ao adicionar entrada de alimentos." });
      }
    }
  );

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
        id_alimento: z.string().uuid().optional(),
        data_vencimento: z.string().optional(),
        data_entrada: z.string().optional(),
        quantidade: z.number().optional(),
        unidade_medida_id: z.number().optional(),
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
