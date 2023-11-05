import { FastifyInstance } from 'fastify'
import { all, create, getById } from '../Repositories/funcionarioRepository'
import { z } from 'zod'
import { funcionario } from '../Entities/funcionario'

export async function funcionarioRoutes(app: FastifyInstance) {
  //   app.post('/login', async (request, reply) => {
  //     // Verifique as credenciais (substitua pelo seu próprio mecanismo de autenticação)
  //     const auth = z.object({
  //       email: z.string(),
  //       senha: z.string(),
  //     })

  //     const { email, senha } = auth.parse(request.body)

  //     const funcionario = await login(email, senha);

  // 	if (funcionario) {
  // 	  reply
  // 		.setCookie('sessionId', funcionario.token, {
  // 		  path: '/',
  // 		  httpOnly: true,
  // 		  secure: true,
  // 		  sameSite: 'none',
  // 		})
  // 		.status(201)
  // 		.send({ message: 'Usuário logado com sucesso' })
  // 	} else {
  // 	  reply.status(401).send({ error: 'Credenciais inválidas' })
  // 	}
  //   })
  app.get('/', async (request, reply) => {
    try {
      const funcionarios = await all()
      return reply.status(201).send(funcionarios)
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao obter usuários' }
    }
  })

  app.get('/:id', async (request, reply) => {
    try {
      const getLancamentoParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getLancamentoParamsSchema.parse(request.params)
      const funcionario = await getById(id)
      return reply.status(201).send(funcionario)
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao obter usuários' }
    }
  })

  app.post('/', async (request, reply) => {
    try {
      const createFuncionarioBodySchema = z.object({
        nome: z.string(),
        email: z.string(),
        senha: z.string(),
        telefone: z.string(),
        cargo: z.string(),
        salario: z.number(),
        data_contratacao: z.coerce.date(),
        papel_id: z.string(),
      })

      const {
        nome,
        email,
        senha,
        telefone,
        cargo,
        salario,
        data_contratacao,
        papel_id,
      } = createFuncionarioBodySchema.parse(request.body)

      const funcionario: funcionario = {
        nome,
        email,
        senha,
        telefone,
        cargo,
        salario,
        data_contratacao,
        papel_id,
      }

      await create(funcionario)

      reply.status(201).send({ message: 'Usuário criado com sucesso' })
    } catch (error: any) {
      console.error('Erro ao inserir usuário:', error)
      reply.status(500).send(error.message)
    }
  })

  app.put('/:id', async (request, reply) => {
    try {
      const updateFuncionarioBodySchema = z.object({
        id: z.string().uuid(),
        nome: z.string(),
        email: z.string(),
        senha: z.string(),
        telefone: z.string(),
        cargo: z.string(),
        salario: z.number(),
        data_contratacao: z.coerce.date(),
        papel_id: z.string(),
      })

      const {
        id,
        nome,
        email,
        senha,
        telefone,
        cargo,
        salario,
        data_contratacao,
        papel_id,
      } = updateFuncionarioBodySchema.parse(request.body)

      const funcionario: funcionario = {
        id,
        nome,
        email,
        senha,
        telefone,
        cargo,
        salario,
        data_contratacao,
        papel_id,
      }

      await update(funcionario)

      reply.status(201).send({ message: 'Usuário atualizado com sucesso' })
    } catch (error: any) {
      console.error('Erro ao atualizar usuário:', error)
      reply.status(500).send(error.message)
    }
  })

  app.delete('/:id', async (request, reply) => {
    try {
      const deleteFuncionarioParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = deleteFuncionarioParamsSchema.parse(request.params)

      await remove(id)

      reply.status(201).send({ message: 'Usuário deletado com sucesso' })
    } catch (error: any) {
      console.error('Erro ao deletar usuário:', error)
      reply.status(500).send(error.message)
    }
  })
}
