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

  app.post("/", async (request, reply) => {
    const createClienteBodySchema = z.object({
      nome: z.string(),
      email: z.string().email(),
      telefone: z.string(),
      cpf_cnpj: z.string(),
      tipo: z.string(),
    });

    try {
      const { nome, email, telefone, cpf_cnpj, tipo } =
        createClienteBodySchema.parse(request.body);

      let sessionId = request.cookies.sessionId;

      if (!sessionId) {
        sessionId = randomUUID();

        reply.setCookie("sessionId", sessionId, {
          path: "/",
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });
      }

      const id = randomUUID();

      await knex("cliente").insert({
        id,
        nome,
        email,
        telefone,
        cpf_cnpj,
        tipo,
      });
      return reply
        .status(201)
        .send({ message: "Cliente cadastrado com sucesso!" });
    } catch (error) {
      return reply.status(400).send({ message: "Erro ao cadastrar cliente." });
    }
  });

  app.put("/:id", async (request, reply) => {
    const updateClienteParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const updateClienteBodySchema = z.object({
      nome: z.string(),
      email: z.string().email(),
      telefone: z.string(),
      cpf_cnpj: z.string(),
      tipo: z.string(),
    });

    try {
      const { id } = updateClienteParamsSchema.parse(request.params);
      const { nome, email, telefone, cpf_cnpj, tipo } =
        updateClienteBodySchema.parse(request.body);

      const updatedCliente = {
        nome,
        email,
        telefone,
        cpf_cnpj,
        tipo,
      };

      await knex("cliente").where({ id }).update(updatedCliente);

      return reply
        .status(200)
        .send({ message: "Cliente atualizado com sucesso!" });
    } catch (error) {
      return reply.status(400).send({ message: "Erro ao atualizar cliente." });
    }
  });

  app.delete(
    "/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const deleteClienteParamsSchema = z.object({
        id: z.string().uuid(),
      });

      try {
        const { id } = deleteClienteParamsSchema.parse(request.params);

        await knex("cliente").where({ id }).del();

        return reply
          .status(200)
          .send({ message: "Cliente excluído com sucesso!" });
      } catch (error) {
        return reply.status(400).send({ message: "Erro ao excluir cliente." });
      }
    }
  );
}
