import { FastifyInstance } from "fastify"
import { all, create, getById } from "../Repositories/categoryRepository"
import { z } from 'zod';
import { category } from "../Entities/category";

export async function categoryRoutes(app: FastifyInstance) {
    app.get(
      '/',
      async () => {
        const categories = await all()
        return categories
      },
    )

    app.get(
      '/:id',
      async (request) => {
        const getLancamentoParamsSchema = z.object({
          id: z.string().uuid(),
        });
  
        const { id } = getLancamentoParamsSchema.parse(request.params);
  
        const category = await getById(id)
  
        return category;
      }
    );

    app.post('/', async (request, reply) => {
      try{

        const createFuncionarioBodySchema = z.object({
          name: z.string(),
        })
    
        const { name } = createFuncionarioBodySchema.parse(request.body)
        
        const category: category = {name};
  
        create(category)
        
        reply.status(201).send()
        
      }catch(error : any){
        console.error('Erro ao inserir usuário:', error);
        reply.status(500).send(error.message);
      }

    }
    )
  

  }