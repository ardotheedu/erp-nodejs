import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { knex } from "../database";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

export async function clienteRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies;

      const clientes = await knex("cliente").select();

      return { clientes };
    }
  );

  app.get(
    "/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const getClienteParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getClienteParamsSchema.parse(request.params);

      const { sessionId } = request.cookies;

      const lancamento = await knex("cliente")
        .where({
          id,
        })
        .first();

      return {
        lancamento,
      };
    }
  );

  app.post("/clientes", async (request, reply) => {
    const createClienteBodySchema = z.object({
      id_cliente: z.string().uuid(),
      nome: z.string(),
      email: z.string().email(),
      telefone: z.string(),
      cpf: z.string(),
      tipo: z.string(),
    });

    const { id_cliente, nome, email, telefone, cpf, tipo } =
      createClienteBodySchema.parse(request.body);

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      reply.setCookie("sessionId", sessionId, {
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });
    }

    await knex("cliente").insert({
      id: randomUUID(),
      nome,
      email,
      telefone,
      cpf,
      tipo,
    });
    return reply.status(201).send();
  });
}
