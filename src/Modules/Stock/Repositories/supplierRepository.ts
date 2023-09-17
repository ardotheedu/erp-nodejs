import { UUID, randomUUID } from 'node:crypto'
import { knex } from '../../../database'
import { supplier } from '../Entities/supplier'

export async function all(): Promise<supplier[]> {
  const suppliers = await knex<supplier>('fornecedor').select(
    'id',
    'nome_fantasia as fantasy_name',
    'cnpj',
    'telefone as telephone',
    'email',
  )
  return suppliers
}

export async function getById(id: string): Promise<supplier> {
  const supplier = await knex<supplier>('fornecedor')
    .where('id', id)
    .first(
      'id',
      'nome_fantasia as fantasy_name',
      'cnpj',
      'telefone as telephone',
      'email',
    )

  return supplier
}

export async function create(supplier: supplier): Promise<void> {
  supplier.id = randomUUID()

  await knex('fornecedor').insert({
    id: supplier.id,
    nome_fantasia: supplier.fantasy_name,
    cnpj: supplier.cnpj,
    telefone: supplier.telephone,
    email: supplier.email,
  })
}
