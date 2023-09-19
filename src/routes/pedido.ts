import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { knex } from "../database";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

export async function pedidoRoutes(app: FastifyInstance) {
  app.get(
    "/pedidos",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies;

      const pedidos = await knex("pedido").select();

      return { pedidos };
    }
  );

  app.get(
    "/pedidos/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const getPedidoParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getPedidoParamsSchema.parse(request.params);

      const { sessionId } = request.cookies;

      const pedido = await knex("pedido")
        .where({
          id,
        })
        .first();

      return {
        pedido,
      };
    }
  );

  app.post("/pedidos", async (request, reply) => {
    const createPedidoBodySchema = z.object({
      id_pedido: z.string().uuid(),
      cliente_id_pedido: z.string(),
      data_pedido: z.string(),
      total: z.string(),
      status_pagamento: z.string(),
      status_pedido: z.string(),
    });

    const {
      id_pedido,
      cliente_id_pedido,
      data_pedido,
      total,
      status_pagamento,
      status_pedido,
    } = createPedidoBodySchema.parse(request.body);

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      reply.setCookie("sessionId", sessionId, {
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });
    }

    await knex("pedido").insert({
      id: randomUUID(),
      cliente_id_pedido,
      data_pedido,
      total,
      status_pagamento,
      status_pedido,
    });

    return reply.status(201).send();
  });
}
