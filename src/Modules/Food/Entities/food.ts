import { UUID } from 'node:crypto'

export interface Alimento {
  id?: string
  nome: string
  unidade_medida: string
  quantidade_em_estoque?: number
}
