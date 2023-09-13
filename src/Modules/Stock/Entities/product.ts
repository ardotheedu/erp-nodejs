import { UUID } from 'node:crypto';
import { string } from 'zod';

export interface product {
    id?: UUID
    name: string
    description: string
    price_sale: number
    unit_price: number
    quantity: number
    expiration_date: Date
    batch: string
    category_id: UUID | string
    supplier_id: UUID | string
}