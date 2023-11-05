import { FastifyInstance } from 'fastify'
import { funcionarioRoutes } from './funcionarioRoute'
import { permissaoRoutes } from './permissaoRoute'
import { dadosBancariosRoute } from '../routes/dadosBancariosRoute'
import { contraChequeRoute } from '../routes/contraChequeRoute'

export async function registerRHRoutes(app: FastifyInstance) {
  app.register(funcionarioRoutes, { prefix: 'funcionarios' })
  app.register(permissaoRoutes, { prefix: 'permissoes' })
  app.register(dadosBancariosRoute, { prefix: 'dados_bancarios' })
  app.register(contraChequeRoute, { prefix: 'contra_cheque' })
}
