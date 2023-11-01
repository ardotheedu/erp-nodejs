import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { knex } from "../database";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

export async function pedidoRoutes(app: FastifyInstance) {
  app.get(
    "/",
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
    "/:id",
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
  app.get('/historico', async (request, reply) => {
    try {
      const historico = await knex('historico_pedido').select();
      return { historico };
    } catch (error) {
      console.error(error);
      return reply.status(500).send('Erro ao buscar o histórico de pedidos.');
    }
  });

  app.post("/", async (request, reply) => {
    const createPedidoBodySchema = z.object({
      cliente_id_pedido: z.string(),
      data_pedido: z.string(),
      total: z.string(),
      status_pagamento: z.string(),
      status_pedido: z.string(),
    });

    try {
      const {
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

      const id = randomUUID();

      await knex("pedido").insert({
        id,
        cliente_id_pedido,
        data_pedido,
        total,
        status_pagamento,
        status_pedido,
      });

      return reply
        .status(201)
        .send({ message: "Pedido cadastrado com sucesso!" });
    } catch (error) {
      return reply.status(400).send({ message: "Erro ao cadastrar pedido." });
    }
  });

  app.put("/:id", async (request, reply) => {
    const updatePedidoParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const updatePedidoBodySchema = z.object({
      cliente_id_pedido: z.string(),
      data_pedido: z.string(),
      total: z.string(),
      status_pagamento: z.string(),
      status_pedido: z.string(),
    });

    try {
      const { id } = updatePedidoParamsSchema.parse(request.params);
      const {
        cliente_id_pedido,
        data_pedido,
        total,
        status_pagamento,
        status_pedido,
      } = updatePedidoBodySchema.parse(request.body);

      const updatedPedido = {
        cliente_id_pedido,
        data_pedido,
        total,
        status_pagamento,
        status_pedido,
      };

      await knex("pedido").where({ id }).update(updatedPedido);

      return reply
        .status(200)
        .send({ message: "Pedido atualizado com sucesso!" });
    } catch (error) {
      return reply.status(400).send({ message: "Erro ao atualizar pedido." });
    }
  });

  // Rota DELETE para excluir um pedido
  app.delete("/:id", async (request, reply) => {
    const deletePedidoParamsSchema = z.object({
      id: z.string().uuid(),
    });

    try {
      const { id } = deletePedidoParamsSchema.parse(request.params);

      await knex("pedido").where({ id }).del();

      return reply
        .status(200)
        .send({ message: "Pedido excluído com sucesso!" });
    } catch (error) {
      return reply.status(400).send({ message: "Erro ao excluir pedido." });
    }
  });
}
