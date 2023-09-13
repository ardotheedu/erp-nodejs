import { FastifyInstance } from "fastify"
import { all, create, getById } from "../Repositories/productRepository"
import { z } from 'zod';
import { product } from "../Entities/product";

export async function productRoutes(app: FastifyInstance) {
    app.get(
      '/',
      async () => {
        const products = await all()
        return products
      },
    )

    app.get(
      '/:id',
      async (request) => {
        const getLancamentoParamsSchema = z.object({
          id: z.string().uuid(),
        });
  
        const { id } = getLancamentoParamsSchema.parse(request.params);
  
        const product = await getById(id)
  
        return product;
      }
    );

    app.post('/', async (request, reply) => {
      try{

        const createFuncionarioBodySchema = z.object({
          name: z.string(),
          description: z.string(),
          price_sale: z.number(),
          unit_price: z.number(),
          quantity: z.number(),
          expiration_date: z.coerce.date(),
          batch: z.string(),
          category_id: z.string().uuid(),
          supplier_id: z.string().uuid()

        })
    
        const {name,description,price_sale,unit_price,quantity,expiration_date,batch,category_id, supplier_id} = createFuncionarioBodySchema.parse(request.body)
        
        const product: product = {name,description,price_sale,unit_price,quantity,expiration_date,batch,category_id,supplier_id};
  
        create(product)
        
        reply.status(201).send()
        
      }catch(error : any){
        console.error('Erro ao inserir usuário:', error);
        reply.status(500).send(error.message);
      }

    }
    )
  

  }