import { UUID } from 'node:crypto'

export interface dadosBancarios {
  id: UUID
  id_funcionario: UUID
  nome_banco: string
  agencia: string
  conta: string
  tipo: string
  pix: string
}
