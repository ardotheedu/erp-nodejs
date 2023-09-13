import { randomUUID } from 'node:crypto';
import { knex } from '../../../database';
import { product } from '../Entities/product';


    export async function all(): Promise<product[]> {
        const products = (await knex<product>('produto').select(
            'id', 
            'nome as name',
            'descricao as description',
            'preco_unitario as price_sale',
            'preco_venda as unit_price',
            'quantidade as quantity',
            'data_validade as expiration_date',
            'lote as batch',
            'produto_categoria_id as category_id',
            'produto_fornecedor_id as supplier_id'))
        return products
    }

    export async function getById(id: string): Promise<product> {
        
        const product = await knex<product>('produto').where('id',id )
        .first(
            'id', 
            'nome as name',
            'descricao as description',
            'preco_unitario as price_sale',
            'preco_venda as unit_price',
            'quantidade as quantity',
            'data_validade as expiration_date',
            'lote as batch',
            'produto_categoria_id as category_id',
            'produto_fornecedor_id as supplier_id'
            );
        
        return product
    }

    export async function create(product: product): Promise<void> {
        
        product.id = randomUUID();
        
        await knex('produto').insert(
            {
            id: product.id, 
            nome: product.name,
            descricao: product.description,
            preco_unitario: product.price_sale,
            preco_venda: product.unit_price,
            quantidade: product.quantity,
            data_validade: product.expiration_date,
            lote: product.batch,
            produto_categoria_id: product.category_id,
            produto_fornecedor_id: product.supplier_id
            })

    }
    