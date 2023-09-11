import { FastifyInstance } from 'fastify'
import { categoryRoutes } from './category'

export async function registerStockRoutes(app: FastifyInstance) {
  
  app.register(categoryRoutes,{prefix:'category'})

}

