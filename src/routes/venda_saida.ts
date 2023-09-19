import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { knex } from "../database";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

export async function vendaSaidaRoutes(app: FastifyInstance) {
  // Endpoint para listar todas as vendas de saída
  app.get(
    "/vendas-saida",
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
    "/vendas-saida/:id",
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

  // Endpoint para criar uma nova venda de saída
  app.post("/vendas-saida", async (request, reply) => {
    const createVendaSaidaBodySchema = z.object({
      id: z.string().uuid(),
      pedido_id_venda: z.string(),
      data_saida: z.string(), // Você pode ajustar isso para um tipo de data apropriado
      funcionario_id: z.string(),
      total_da_venda: z.string(), // Você pode ajustar isso para um tipo numérico apropriado
    });

    const { id, pedido_id_venda, data_saida, funcionario_id, total_da_venda } =
      createVendaSaidaBodySchema.parse(request.body);

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      reply.setCookie("sessionId", sessionId, {
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });
    }

    await knex("venda_saida").insert({
      id: randomUUID(),
      pedido_id_venda,
      data_saida, // Ajuste para um formato de data adequado
      funcionario_id,
      total_da_venda, // Ajuste para um tipo numérico adequado
    });

    return reply.status(201).send();
  });
}