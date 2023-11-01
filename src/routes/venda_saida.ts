import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { knex } from "../database";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

export async function vendaSaidaRoutes(app: FastifyInstance) {
  // Endpoint para listar todas as vendas de saída
  app.get(
    "/",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies;

      const vendasSaida = await knex("venda_saida").select();

      return { vendasSaida };
    }
  );

  // Endpoint para obter uma venda de saída por ID
  app.get(
    "/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const getVendaSaidaParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getVendaSaidaParamsSchema.parse(request.params);

      const { sessionId } = request.cookies;

      const vendaSaida = await knex("venda_saida")
        .where({
          id,
        })
        .first();

      return {
        vendaSaida,
      };
    }
  );

  app.get('/relatorio', async (request) => {
    try {
      const query = request.query as RelatorioQuery
      const data_inicial = query.data_inicial
      const data_final = query.data_final
      console.log(data_inicial)
      const venda_saida = await knex('venda_saida')
      .modify(function (queryBuilder) {
        if (query.data_inicial) {
          queryBuilder.where('data_saida', '>=', query.data_inicial)
        }
        if (query.data_final) {
          queryBuilder.where('data_saida', '<', query.data_final)
        }
        if (query.id) {
          queryBuilder.where({
            id: query.id,
          })
        }
      })
        .select()
      return {venda_saida}
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao buscar saida de vendas.' }
    }
  })

  // Endpoint para criar uma nova venda de saída
  app.post("/", async (request, reply) => {
    const createVendaSaidaBodySchema = z.object({
      pedido_id_venda: z.string(),
      data_saida: z.string(), // Você pode ajustar isso para um tipo de data apropriado
      funcionario_id: z.string(),
      total_da_venda: z.string(), // Você pode ajustar isso para um tipo numérico apropriado
    });

    try {
      const { pedido_id_venda, data_saida, funcionario_id, total_da_venda } =
        createVendaSaidaBodySchema.parse(request.body);

      let sessionId = request.cookies.sessionId;

      if (!sessionId) {
        sessionId = randomUUID();

        reply.setCookie("sessionId", sessionId, {
          path: "/",
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });
      }

      const id = randomUUID();

      await knex("venda_saida").insert({
        id,
        pedido_id_venda,
        data_saida, // Ajuste para um formato de data adequado
        funcionario_id,
        total_da_venda, // Ajuste para um tipo numérico adequado
      });

      return reply
        .status(201)
        .send({ message: "Venda/saída cadastrado com sucesso!" });
    } catch (error) {
      return reply
        .status(400)
        .send({ message: "Erro ao cadastrar a venda/saída." });
    }
  });

  app.put("/:id", async (request, reply) => {
    const updateVendaSaidaParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const updateVendaSaidaBodySchema = z.object({
      pedido_id_venda: z.string(),
      data_saida: z.string(), // Você pode ajustar isso para um tipo de data apropriado
      funcionario_id: z.string(),
      total_da_venda: z.string(), // Você pode ajustar isso para um tipo numérico apropriado
    });

    try {
      const { id } = updateVendaSaidaParamsSchema.parse(request.params);
      const { pedido_id_venda, data_saida, funcionario_id, total_da_venda } =
        updateVendaSaidaBodySchema.parse(request.body);

      const updatedVendaSaida = {
        pedido_id_venda,
        data_saida, // Ajuste para um formato de data adequado
        funcionario_id,
        total_da_venda, // Ajuste para um tipo numérico adequado
      };

      await knex("venda_saida").where({ id }).update(updatedVendaSaida);

      return reply
        .status(200)
        .send({ message: "Venda/saída atualizada com sucesso!" });
    } catch (error) {
      return reply
        .status(400)
        .send({ message: "Erro ao atualizar a venda/saída." });
    }
  });

  // Rota DELETE para excluir uma venda de saída
  app.delete("/:id", async (request, reply) => {
    const deleteVendaSaidaParamsSchema = z.object({
      id: z.string().uuid(),
    });

    try {
      const { id } = deleteVendaSaidaParamsSchema.parse(request.params);

      await knex("venda_saida").where({ id }).del();

      return reply
        .status(200)
        .send({ message: "Venda/saída excluída com sucesso!" });
    } catch (error) {
      return reply
        .status(400)
        .send({ message: "Erro ao excluir a venda/saída." });
    }
  });
}
