import { UUID } from 'node:crypto'

export interface contraCheque {
  id: UUID
  id_funcionario: UUID
  remuneracao_principal: number
  comissao: number
  imposto: number
}
