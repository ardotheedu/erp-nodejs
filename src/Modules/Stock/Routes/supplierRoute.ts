import { FastifyInstance } from "fastify"
import { all, create, getById } from "../Repositories/supplierRepository"
import { z } from 'zod';
import { supplier } from "../Entities/supplier";

export async function supplierRoutes(app: FastifyInstance) {
    app.get(
      '/',
      async () => {
        const suppliers = await all()
        return suppliers
      },
    )

    app.get(
      '/:id',
      async (request) => {
        const getLancamentoParamsSchema = z.object({
          id: z.string().uuid(),
        });
  
        const { id } = getLancamentoParamsSchema.parse(request.params);
  
        const supplier = await getById(id)
  
        return supplier;
      }
    );

    app.post('/', async (request, reply) => {
      try{

        const createFuncionarioBodySchema = z.object({
            fantasy_name: z.string(),
            cnpj: z.string(),
            telephone: z.string(),
            email: z.string().email()

        })
    
        const { fantasy_name, cnpj, telephone, email} = createFuncionarioBodySchema.parse(request.body)
        
        const supplier: supplier = {fantasy_name, cnpj, telephone, email};
  
        create(supplier)
        
        reply.status(201).send()
        
      }catch(error : any){
        console.error('Erro ao inserir usuário:', error);
        reply.status(500).send(error.message);
      }

    }
    )
  

  }