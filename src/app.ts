import fastify from 'fastify'
import cookie from '@fastify/cookie'
import * as routes from './routes/index'
import cors from '@fastify/cors'

export const app = fastify()

app.register(cookie)
app.register(cors, {
  origin: '*',
})

app.register(routes.registerStockRoutes, { prefix: 'stock' })

app.register(routes.registerRHRoutes, { prefix: 'rh' })

app.register(routes.dashboardRoutes, { prefix: 'dashboard' })

app.register(routes.clienteRoutes, {
  prefix: 'cliente',
})

app.register(routes.itemPedidoRoutes, {
  prefix: 'item_pedido',
})

app.register(routes.pedidoRoutes, {
  prefix: 'pedido',
})

app.register(routes.vendaSaidaRoutes, {
  prefix: 'venda_saida',
})

app.register(routes.lancamentoRoutes, {
  prefix: 'lancamento',
})

app.register(routes.caixaRoutes, {
  prefix: 'caixa',
})
app.register(routes.permissaoRoutes, {
  prefix: 'permissao',
})
app.register(routes.movimentacaoCaixaRoutes, {
  prefix: 'movimentacao_caixa',
})
