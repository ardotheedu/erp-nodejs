import { UUID } from 'node:crypto'

export interface Alimento {
  id: UUID
  nome: string
  unidade_medida: string
  quantidade_em_estoque: number
}
