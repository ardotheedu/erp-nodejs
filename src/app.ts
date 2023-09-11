import fastify from 'fastify'
import cookie from '@fastify/cookie'

import * as routes from './routes/index';

export const app = fastify()

app.register(cookie)

app.register(routes.rhRoutes, {
  prefix: 'rh',
})
app.register(routes.registerStockRoutes,{prefix: 'stock'})

