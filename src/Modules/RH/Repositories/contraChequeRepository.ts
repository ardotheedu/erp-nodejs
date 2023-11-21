import { UUID, randomUUID } from 'node:crypto'
import { knex } from '../../../database'
import { contraCheque } from '../Entities/contraCheque'
import dayjs from 'dayjs'

interface ContraChequeQuery {
  funcionario_id: string
  mes: string
}

interface RelatorioQuery {
  data_emissao: string
  id_funcionario: string
}

export async function all(): Promise<contraCheque[]> {
  const contraCheque = await knex<contraCheque>('contra_cheque').select()
  return contraCheque
}

export async function getById(id: string): Promise<contraCheque> {
  try {
    const contraCheque = await knex('contra_cheque').where({ id }).first()

    if (contraCheque) {
      return contraCheque
    } else {
      throw new Error('Contra cheque não encontrado')
    }
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao obter o contra cheque')
  }
}

export async function create(contraCheque: contraCheque): Promise<void> {
  contraCheque.id = randomUUID()
  await knex('contra_cheque').insert({
    id: contraCheque.id,
    id_funcionario: contraCheque.id_funcionario,
    remuneracao_principal: contraCheque.remuneracao_principal,
    comissao: contraCheque.comissao,
    imposto: contraCheque.imposto,
  })
}

export async function update(contraCheque: contraCheque): Promise<void> {
  await knex('contra_cheque').where({ id: contraCheque.id }).update({
    id_funcionario: contraCheque.id_funcionario,
    remuneracao_principal: contraCheque.remuneracao_principal,
    comissao: contraCheque.comissao,
    imposto: contraCheque.imposto,
  })
}

export async function remove(id: string): Promise<boolean> {
  try {
    await knex('contra_cheque').where({ id }).del()
    return true
  } catch (error) {
    throw new Error('Erro ao deletar o contra cheque')
  }
}

export async function getContracheque(params: ContraChequeQuery) {
  const query = params as RelatorioQuery
  const data_emissao = query.data_emissao
  const id_funcionario = query.id_funcionario

  const dataInicial = dayjs(data_emissao, 'DD/MM/YYYY')
    .startOf('month')
    .format()
  const dataFinal = dayjs(data_emissao, 'DD/MM/YYYY').endOf('month').format()

  console.log(dataInicial, dataFinal)

  const contraCheques = await knex('contra_cheque')
    .select('*')
    .where({ id_funcionario })
    .andWhere('data_emissao', '>=', dataInicial)
    .andWhere('data_emissao', '<=', dataFinal)

  return { contraCheques }

  return { lancamentos }
}
