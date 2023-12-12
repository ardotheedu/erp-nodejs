import { FastifyInstance } from 'fastify'
import {
  all,
  create,
  getById,
  remove,
  update,
} from '../Repositories/permissaoRepository'
import { z } from 'zod'

import { permissao } from '../Entities/permissao'

export async function permissaoRoutes(app: FastifyInstance) {
  app.get('/', async (request) => {
    try {
      const permissoes = await all()
      return { permissoes }
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao buscar permissões.' }
    }
  })

  app.post('/', async (request, reply) => {
    const createPermissaoBodySchema = z.object({
      nome: z.string(),
    })

    try {
      const { nome } = createPermissaoBodySchema.parse(request.body)

      await create({ nome })
      return reply
        .status(201)
        .send({ message: 'Permissão cadastrada com sucesso!' })
    } catch (error) {
      console.error(error)
      return reply.status(400).send({ message: 'Erro ao cadastrar permissão.' })
    }
  })

  app.put('/:id', async (request, reply) => {
    const updatePermissaoParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const updatePermissaoBodySchema = z.object({
      nome: z.string(),
    })

    const { id } = updatePermissaoParamsSchema.parse(request.params)

    const { nome } = updatePermissaoBodySchema.parse(request.body)

    try {
      await update({ id, nome })
      return reply
        .status(201)
        .send({ message: 'Permissão atualizada com sucesso!' })
    } catch (error) {
      console.error(error)
      return reply.status(400).send({ message: 'Erro ao atualizar permissão.' })
    }
  })

  app.delete('/:id', async (request, reply) => {
    const deletePermissaoParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = deletePermissaoParamsSchema.parse(request.params)

    try {
      await remove(id)
      return reply
        .status(201)
        .send({ message: 'Permissão deletada com sucesso!' })
    } catch (error) {
      console.error(error)
      return reply.status(400).send({ message: 'Erro ao deletar permissão.' })
    }
  })
}
