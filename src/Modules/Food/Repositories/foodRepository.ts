import { UUID, randomUUID } from 'node:crypto'
import { knex } from '../../../database'
import { Alimento } from '../Entities/food'
import dayjs from 'dayjs'

interface Relatorio {
  data_inicial: string
  data_final: string
}

interface OperacaoEntradaParams {
  alimento_id: string
  data_vencimento: string
  data_entrada: string
  quantidade: number
}

interface OperacaoSaidaParams {
  alimento_id: string
  quantidade: number
  data_saida: string
}

export async function relatorioEntrada(params: Relatorio): Promise<any> {
  try {
    const { data_inicial, data_final } = params

    const dataInicial = dayjs(data_inicial, 'YYYY/MM/DD')
      .startOf('month')
      .format()
    const dataFinal = dayjs(data_final, 'YYYY/MM/DD').endOf('month').format()

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
    const { data_inicial, data_final } = params

    const dataInicial = dayjs(data_inicial, 'YYYY/MM/DD').startOf('month').format()
    const dataFinal = dayjs(data_final, 'YYYY/MM/DD').endOf('month').format()

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
    const { alimento_id, data_vencimento, data_entrada, quantidade } = params

    const alimento = await knex<Alimento>('alimentos')
      .where({
        id: alimento_id,
      })
      .first()

    await knex('alimentos')
      .where({ id: alimento_id })
      .update({
        quantidade_em_estoque: alimento?.quantidade_em_estoque
          ? alimento.quantidade_em_estoque + quantidade
          : quantidade,
      })

    const dataVencimento = dayjs(data_vencimento, 'YYYY/MM/DD').format()
    const dataEntrada = dayjs(data_entrada, 'YYYY/MM/DD').format()
    await knex('entrada_alimentos').insert({
      alimento_id,
      data_vencimento: dataVencimento,
      data_entrada: dataEntrada,
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
    const alimento = await knex<Alimento>('alimentos')
      .where({
        id: alimento_id,
      })
      .first()

    await knex('alimentos')
      .where({ id: alimento_id })
      .update({
        quantidade_em_estoque: alimento?.quantidade_em_estoque
          ? alimento.quantidade_em_estoque - quantidade
          : 0,
      })
      console.log(data_saida);
    const dataSaida = dayjs(data_saida, 'YYYY-MM-DD').format()
    console.log(dataSaida);

    await knex('saida_alimentos').insert({
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

export async function dicionario(): Promise<Alimento[]> {
  const food = await knex<Alimento>('alimentos').select('id', 'nome')
  return food
}

export async function getById(id: string): Promise<Alimento> {
  try {
    console.log(id)
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
  await knex('alimentos').insert({
    id: randomUUID(),
    nome: food.nome,
    unidade_medida: food.unidade_medida,
    quantidade_em_estoque: food.quantidade_em_estoque,
  })
}

export async function update(food: Alimento): Promise<void> {
  await knex('alimentos').where({ id: food.id }).update({
    nome: food.nome,
    unidade_medida: food.unidade_medida,
  })
}

export async function remove(id: string): Promise<boolean> {
  try {
    await knex('alimentos').where({ id }).del()
    return true
  } catch (error) {
    throw new Error('Erro ao deletar o alimento')
  }
}
