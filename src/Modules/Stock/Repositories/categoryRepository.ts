import { UUID, randomUUID } from 'node:crypto'
import { knex } from '../../../database'
import { category } from '../Entities/category'

export async function all(): Promise<category[]> {
  const categories = await knex<category>('categoria_produto').select(
    'id',
    'nome as name',
  )
  return categories
}

export async function getById(id: string): Promise<category> {
  const category = await knex<category>('categoria_produto')
    .where('id', id)
    .first('id', 'nome as name')

  return category
}

export async function create(category: category): Promise<void> {
  category.id = randomUUID()

  await knex('categoria_produto').insert({
    id: category.id,
    nome: category.name,
  })
}
