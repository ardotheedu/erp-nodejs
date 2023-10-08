import { UUID } from 'node:crypto';

export interface supplier {
    id?: UUID
    fantasy_name: string
    cnpj: string
    telephone: string,
    email: string
}