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
      .select(
        'alimentos.quantidade as quantidade_em_estoque',
        'alimentos.nome as nome',
        'entrada_alimentos.*',
      )
      .whereBetween('data_entrada', [dataInicial, dataFinal])
      .join('alimentos', 'entrada_alimentos.alimento_id', '=', 'alimentos.id')

    return { entradas }
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao gerar relatório de saída')
  }
}

export async function relatorioSaida(params: Relatorio): Promise<any> {
  try {
    const { data_inicial, data_final } = params

    const dataInicial = dayjs(data_inicial, 'YYYY/MM/DD')
      .startOf('month')
      .format()
    const dataFinal = dayjs(data_final, 'YYYY/MM/DD').endOf('month').format()

    const saidas = await knex('saida_alimentos')
      .select(
        'alimentos.quantidade as quantidade_em_estoque',
        'alimentos.nome as nome',
        'saida_alimentos.*',
      )
      .whereBetween('data_saida', [dataInicial, dataFinal])
      .join(
        'unidade_medida',
        'saida_alimentos.unidade_medida_id',
        '=',
        'unidade_medida.id',
      )
      .join('alimentos', 'saida_alimentos.alimento_id', '=', 'alimentos.id')

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
        quantidade: alimento?.quantidade_em_estoque
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
      unidades_medida_id: alimento?.unidade_medida_id,
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
      .where({ id: alimento_id })
      .first()

    if (alimento) {
      const novaQuantidade = alimento.quantidade - quantidade
      await knex('alimentos').where({ id: alimento_id }).update({
        quantidade: novaQuantidade,
      })
    }

    const alimento_depois = await knex<Alimento>('alimentos')
      .where({ id: alimento_id })
      .first()
    console.log(alimento_depois)
    const dataSaida = dayjs(data_saida, 'YYYY/MM/DD').format()

    await knex('saida_alimentos').insert({
      id: randomUUID(),
      alimento_id,
      quantidade,
      data_saida: dataSaida,
      unidade_medida_id: alimento?.unidade_medida_id,
    })
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao registrar saída no alimento')
  }
}

export async function all(): Promise<Alimento[]> {
  const food = await knex<Alimento>('alimentos')
    .select('alimentos.*', 'unidade_medida.nome as nome_unidade_medida')
    .join(
      'unidade_medida',
      'alimentos.unidade_medida_id',
      '=',
      'unidade_medida.id',
    )
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
  const id = randomUUID()
  const unidade_medida = await knex('unidade_medida')
    .where('sigla', food.unidade_medida)
    .first()
  await knex('alimentos').insert({
    id,
    nome: food.nome,
    unidade_medida_id: unidade_medida.id,
    quantidade: food.quantidade_em_estoque,
  })

  await knex('entrada_alimentos').insert({
    alimento_id: id,
    data_vencimento: dayjs(new Date()).format('YYYY-MM-DD'),
    data_entrada: dayjs(new Date()).format('YYYY-MM-DD'),
    quantidade: food.quantidade_em_estoque,
    unidade_medida_id: unidade_medida.id,
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
