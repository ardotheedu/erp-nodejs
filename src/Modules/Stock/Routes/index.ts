import { FastifyInstance } from 'fastify'
import { categoryRoutes } from './categoryRoute'
import { supplierRoutes } from './supplierRoute'
import { productRoutes } from './productRoute'

export async function registerStockRoutes(app: FastifyInstance) {
  
  app.register(categoryRoutes,{prefix:'categories'})
  app.register(supplierRoutes,{prefix:'suppliers'})
  app.register(productRoutes,{prefix:'products'})

}

