import { FastifyInstance } from 'fastify'
import { funcionarioRoutes } from './funcionarioRoute'
import { permissaoRoutes } from './permissaoRoute'
import { dadosBancariosRoutes } from '../routes/dadosBancariosRoute'
import { contraChequeRoutes } from '../routes/contraChequeRoute'

export async function registerRHRoutes(app: FastifyInstance) {
  app.register(funcionarioRoutes, { prefix: 'funcionarios' })
  app.register(permissaoRoutes, { prefix: 'permissoes' })
  app.register(dadosBancariosRoutes, { prefix: 'dados_bancarios' })
  app.register(contraChequeRoutes, { prefix: 'contra_cheque' })
}
