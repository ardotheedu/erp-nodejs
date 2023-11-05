import { UUID, randomUUID } from 'node:crypto'
import { knex } from '../../../database'
import { dadosBancarios } from '../Entities/dadosBancarios'

export async function all(): Promise<dadosBancarios[]> {
  const dadosBancarios = await knex<dadosBancarios>('dados_bancarios').select()
  return dadosBancarios
}

export async function getById(id: string): Promise<dadosBancarios> {
  try {
    const dadosBancarios = await knex('dados_bancarios').where({ id }).first()

    if (dadosBancarios) {
      return dadosBancarios
    } else {
      throw new Error('Dados bancários não encontrados')
    }
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao obter os dados bancários')
  }
}

export async function create(dadosBancarios: dadosBancarios): Promise<void> {
  dadosBancarios.id = randomUUID()
  await knex('dados_bancarios').insert({
    id: dadosBancarios.id,
    id_funcionario: dadosBancarios.id_funcionario,
    nome_banco: dadosBancarios.nome_banco,
    agencia: dadosBancarios.agencia,
    conta: dadosBancarios.conta,
    tipo: dadosBancarios.tipo,
    pix: dadosBancarios.pix,
  })
}

export async function update(dadosBancarios: dadosBancarios): Promise<void> {
  await knex('dados_bancarios').where({ id: dadosBancarios.id }).update({
    id_funcionario: dadosBancarios.id_funcionario,
    nome_banco: dadosBancarios.nome_banco,
    agencia: dadosBancarios.agencia,
    conta: dadosBancarios.conta,
    tipo: dadosBancarios.tipo,
    pix: dadosBancarios.pix,
  })
}

export async function remove(id: string): Promise<boolean> {
  try {
    await knex('dados_bancarios').where({ id }).del()
    return true
  } catch (error) {
    throw new Error('Erro ao deletar os dados bancários')
  }
}
