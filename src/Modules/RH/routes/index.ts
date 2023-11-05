import { FastifyInstance } from 'fastify'
import { funcionarioRoutes } from './funcionarioRoute'

export async function registerRHRoutes(app: FastifyInstance) {
  app.register(funcionarioRoutes, { prefix: 'funcionarios' })
}
