import { UUID } from 'node:crypto'

export interface funcionario {
  id: UUID
  nome: string
  email: string
  senha: string
  telefone: string
  created_at: Date
  cargo: string
  salario: string
  data_contratacao: Date
  papel_id: string
}
