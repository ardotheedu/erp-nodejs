import { foodRoutes } from '../routes/foodRoute'

export async function registerRHRoutes(app: FastifyInstance) {
  app.register(foodRoutes, { prefix: 'alimentos' })
}
