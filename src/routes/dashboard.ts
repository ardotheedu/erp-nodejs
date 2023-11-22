import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'

export async function dashboardRoutes(app: FastifyInstance) {
  app.get('/', async (request) => {
    try {
      const vendas = await calcularTotalPorMes('venda')
      const pagamentos = await calcularTotalPorMes('pagamento')
      const produtos = await knex('produto').select('nome', 'quantidade')
      return {
        vendas,
        pagamentos,
        produtos,
      }
    } catch (error) {
      console.error(error)
      return { error: 'Erro ao buscar lançamentos.' }
    }
  })
}

async function calcularTotalPorMes(type: 'venda' | 'pagamento') {
  const mesesDoAno = {}
  const nomesDosMeses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  for (const mes of nomesDosMeses) {
    mesesDoAno[mes] = 0 // Inicializa com valor zero
  }
  if (type === 'venda') {
    const vendas = await knex('venda_saida').select(
      'total_da_venda',
      'data_saida',
    )
    for (const venda of vendas) {
      const data = new Date(venda.data_saida)
      const mes = nomesDosMeses[data.getMonth()]
      mesesDoAno[mes] += venda.total_da_venda
    }
  } else {
    const lancamentos = await knex('lancamento').select(
      'valor',
      'data_vencimento',
    )
    for (const lancamento of lancamentos) {
      const data = new Date(lancamento.data_vencimento)
      const mes = nomesDosMeses[data.getMonth()]
      mesesDoAno[mes] += lancamento.valor
    }
  }
  return mesesDoAno
}
