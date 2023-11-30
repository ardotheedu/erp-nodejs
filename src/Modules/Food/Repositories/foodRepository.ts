import { UUID, randomUUID } from 'node:crypto'
import { knex } from '../../../database'
import { Alimento } from '../Entities/food'
import dayjs from 'dayjs'

interface Relatorio {
  data_inicial: Date
  data_final: Date
}

interface OperacaoEntradaParams {
  alimento_id: string
  data_vencimento: Date
  data_entrada: Date
  quantidade: number
}

interface OperacaoSaidaParams {
  alimento_id: string
  quantidade: number
  data_saida: string
}

export async function relatorioEntrada(params: Relatorio): Promise<any> {
  try {
    const { data } = params

    const dataInicial = dayjs(data, 'DD/MM/YYYY').startOf('month').format()
    const dataFinal = dayjs(data, 'DD/MM/YYYY').endOf('month').format()

    const entradas = await knex('entrada_alimentos')
      .select('*')
      .whereBetween('data_entrada', [dataInicial, dataFinal])

    return { entradas }
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao gerar relatório de saída')
  }
}

export async function relatorioSaida(params: Relatorio): Promise<any> {
  try {
    const { data } = params

    const dataInicial = dayjs(data, 'DD/MM/YYYY').startOf('month').format()
    const dataFinal = dayjs(data, 'DD/MM/YYYY').endOf('month').format()

    const saidas = await knex('saida_alimentos')
      .select('*')
      .whereBetween('data_saida', [dataInicial, dataFinal])

    return { saidas }
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao gerar relatório de saída')
  }
}

export async function darEntrada(params: OperacaoEntradaParams): Promise<void> {
  try {
    const { alimento_id, data_de_vencimento, data_entrada, quantidade } = params

    await knex('entrada_alimentos').insert({
      alimento_id,
      data_de_vencimento,
      data_entrada,
      quantidade,
    })
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao dar entrada no alimento')
  }
}

export async function registrarSaida(
  params: OperacaoSaidaParams,
): Promise<void> {
  try {
    const { alimento_id, quantidade, data_saida } = params

    await knex('saidas').insert({
      alimento_id,
      quantidade,
      data_saida,
    })
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao registrar saída no alimento')
  }
}

export async function all(): Promise<Alimento[]> {
  const food = await knex<Alimento>('alimentos').select()
  return food
}

export async function getById(id: string): Promise<Alimento> {
  try {
    const food = await knex('alimentos').where({ id }).first()

    if (food) {
      return food
    } else {
      throw new Error('food não encontrado')
    }
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao obter o food')
  }
}

export async function create(food: Alimento): Promise<void> {
  food.id = await knex('alimentos').insert({
    id: randomUUID(),
    unidade_medida: food.unidade_medida,
    quantidade_estoque: food.quantidade_em_estoque,
  })
}

export async function update(food: Alimento): Promise<void> {
  await knex('food').where({ id: food.id }).update({
    unidade_medida: food.unidade_medida,
    quantidade_estoque: food.quantidade_em_estoque,
  })
}

export async function remove(id: string): Promise<boolean> {
  try {
    await knex('food').where({ id }).del()
    return true
  } catch (error) {
    throw new Error('Erro ao deletar o alimento')
  }
}
