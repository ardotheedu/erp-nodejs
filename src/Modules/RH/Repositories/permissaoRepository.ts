import { UUID, randomUUID } from 'node:crypto'
import { knex } from '../../../database'
import { permissao } from '../Entities/permissao'

export async function all(): Promise<permissao[]> {
  const permissao = await knex<permissao>('permissao').select()
  return permissao
}

export async function getById(id: string): Promise<permissao> {
  try {
    const permissao = await knex('permissao').where({ id }).first()

    if (permissao) {
      return permissao
    } else {
      throw new Error('Permissão não encontrada')
    }
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao obter a permissão')
  }
}

export async function create(permissao: permissao): Promise<void> {
  await knex('permissao').insert({
    nome: permissao.nome,
  })
}

export async function update(permissao: permissao): Promise<void> {
  await knex('permissao').where({ id: permissao.id }).update({
    nome: permissao.nome,
  })
}

export async function remove(id: string): Promise<boolean> {
  try {
    await knex('permissao').where({ id }).del()
    return true
  } catch (error) {
    throw new Error('Erro ao deletar a permissão')
  }
}
