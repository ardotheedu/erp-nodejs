import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { knex } from "../database";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

export async function rhRoutes(app: FastifyInstance) {
  // Rota para obter todos os funcionários (GET)
  app.get(
    "/",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
<<<<<<< HEAD
      try {
        const funcionarios = await knex('funcionario').select();
        return funcionarios;
      } catch (error) {
        console.error(error);
        return { error: 'Erro ao obter funcionários' };
      }
=======
      // Lógica para obter todos os funcionários
      // ...
      return { rhRoutes };
    }
  );

  // Rota para obter todos os dados bancários (GET)
  app.get(
    "/dados-bancarios",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      // Lógica para obter todos os dados bancários
      // ...
      return { rhRoutes };
    }
  );

  // Rota para obter todos os contra-cheques (GET)
  app.get(
    "/contra-cheque",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      // Lógica para obter todos os contra-cheques
      // ...
      return { rhRoutes };
>>>>>>> f9e1dec01cf11d5df17fd0727bcabf98a45f4970
    }
  );

  // Rota para obter funcionário por ID (GET)
  app.get(
    "/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const getFuncionarioParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getFuncionarioParamsSchema.parse(request.params);

      const { sessionId } = request.cookies;

<<<<<<< HEAD
      try {
        const funcionario = await knex('funcionario')
          .where({ id })
          .first();
=======
      const funcionario = await knex("funcionario")
        .where({
          id,
        })
        .first();
>>>>>>> f9e1dec01cf11d5df17fd0727bcabf98a45f4970

        if (funcionario) {
          return funcionario;
        } else {
          return { error: 'Funcionário não encontrado' };
        }
      } catch (error) {
        console.error(error);
        return { error: 'Erro ao obter o funcionário' };
      }
    }
  );

  // Rota para criar um novo funcionário (POST)
<<<<<<< HEAD
  app.post('/', async (request, reply) => {
    const createFuncionarioBodySchema = z.object({
      nome: z.string(),
      email: z.string(),
      senha: z.string(),
      telefone: z.string(),
      cargo: z.string(),
      salario: z.number(),
      data_contratacao: z.coerce.date(),
      papel_id: z.string(),
    });

    const {
      nome,
      email,
      senha,
      telefone,
      cargo,
      salario,
      data_contratacao,
      papel_id,
    } = createFuncionarioBodySchema.parse(request.body);

    try {
      const id = randomUUID(); // Gere um novo UUID para o funcionário
      await knex('funcionario').insert({
        id,
        nome,
        email,
        senha,
        telefone,
        cargo,
        salario,
        data_contratacao,
        papel_id,
      });
      return reply.status(201).send();
    } catch (error) {
      console.error(error);
      return reply.status(500).send('Erro ao criar o funcionário');
    }
  }
=======
  app.post("/", async (request, reply) => {
    // Lógica para criar um novo funcionário
    // ...
    return reply.status(201).send();
  });

  // Rota para criar dados bancários (POST)
  app.post("/dados-bancarios", async (request, reply) => {
    // Lógica para criar dados bancários
    // ...
    return reply.status(201).send();
  });

  // Rota para criar contra-cheque (POST)
  app.post("/contra-cheque", async (request, reply) => {
    // Lógica para criar contra-cheque
    // ...
    return reply.status(201).send();
  });
>>>>>>> f9e1dec01cf11d5df17fd0727bcabf98a45f4970

  // Rota para atualizar funcionário por ID (PUT)
  app.put(
    "/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const updateFuncionarioBodySchema = z.object({
        nome: z.string(),
        email: z.string(),
        senha: z.string(),
        telefone: z.string(),
        cargo: z.string(),
        salario: z.number(),
        data_contratacao: z.coerce.date(),
        papel_id: z.string(),
      });

      const {
        nome,
        email,
        senha,
        telefone,
        cargo,
        salario,
        data_contratacao,
        papel_id,
      } = updateFuncionarioBodySchema.parse(request.body);

      const { id } = request.params;

      try {
        // Verifica se o ID existe antes de atualizar
        const funcionario = await knex("funcionario").where({ id }).first();

        if (!funcionario) {
          return reply.status(404).send("Funcionário não encontrado.");
        }

        await knex("funcionario").where({ id }).update({
          nome,
          email,
          senha,
          telefone,
          cargo,
          salario,
          data_contratacao,
          papel_id,
        });

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply.status(500).send("Erro ao atualizar o funcionário.");
      }
    }
  );

  // Rota para excluir funcionário por ID (DELETE)
  app.delete(
    "/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { id } = request.params;

      try {
        // Verifica se o ID existe antes de excluir
        const funcionario = await knex("funcionario").where({ id }).first();

        if (!funcionario) {
          return reply.status(404).send("Funcionário não encontrado.");
        }

        await knex("funcionario").where({ id }).del();

        return reply.status(204).send();
      } catch (error) {
        console.error(error);
        return reply.status(500).send("Erro ao excluir o funcionário.");
      }
    }
  );
<<<<<<< HEAD
=======

  // Rota para atualizar dados bancários por ID (PUT)
  app.put(
    "/dados-bancarios/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      // Lógica para atualizar dados bancários
      // ...
      return reply.status(204).send();
    }
  );

  // Rota para excluir dados bancários por ID (DELETE)
  app.delete(
    "/dados-bancarios/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      // Lógica para excluir dados bancários
      // ...
      return reply.status(204).send();
    }
  );
>>>>>>> f9e1dec01cf11d5df17fd0727bcabf98a45f4970
}
