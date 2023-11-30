import { foodRoutes } from './foodRoute'
import { FastifyInstance } from 'fastify'

export async function registerFoodRoutes(app: FastifyInstance) {
  app.register(foodRoutes)
}
