import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { knex } from '../database';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';
import { sign } from 'jsonwebtoken';
import { authenticate } from '../middlewares/authentication';
import { authorize } from '../middlewares/authorization';
import { UserRole } from '../middlewares/userRoles';
import { env } from '../env';

export async function rhRoutes(app: FastifyInstance) {
  // Rota para obter todos os funcionários (GET)
  
  
  app.post('/login', async (request, reply) => {
    // Verifique as credenciais (substitua pelo seu próprio mecanismo de autenticação)
    const auth = z.object({
      
      email: z.string(),
      senha: z.string(),
      
    });
    
    const {
      
      email,
      senha
      
    } = auth.parse(request.body);
    
    
    const usuario = await knex('funcionario').where({ email }).first();
    
    if(!usuario){
      reply.status(401).send({ error: 'Credenciais inválidas' });
      return;
    }
    
    if (usuario.senha === senha) {
      const userPermission = await knex('funcionario')
                            .select('permissao.nome')
                            .leftJoin('permissao', 'funcionario.papel_id', 'permissao.id')
                            .where('funcionario.id', usuario.id)
                            .first();

      const token = sign({ user: {...usuario, role: userPermission.nome} }, env.SECRETKEY, { expiresIn: '1h' });
      reply.send({ user: usuario,token });
    
    } else {
      reply.status(401).send({ error: 'Credenciais inválidas' });
    }
  });
  
  
  app.get(
    '/',
    {
      preHandler: [authenticate, authorize(UserRole.ADMIN)],
    },
    async (request) => {
      try {
        const funcionarios = await knex('funcionario').select();
        return funcionarios;
      } catch (error) {
        console.error(error);
        return { error: 'Erro ao obter funcionários' };
      }
    }
    );
    
    // Rota para obter funcionário por ID (GET)
    app.get(
      '/:id',
      {
        preHandler: [checkSessionIdExists],
      },
      async (request) => {
        const getFuncionarioParamsSchema = z.object({
          id: z.string().uuid(),
        });
        
        const { id } = getFuncionarioParamsSchema.parse(request.params);
        
        const { sessionId } = request.cookies;
        
        try {
          const funcionario = await knex('funcionario')
          .where({ id })
          .first();
          
          if (funcionario) {
            return funcionario;
          } else {
            return { error: 'Funcionário não encontrado' };
          }
        } catch (error) {
          console.error(error);
          return { error: 'Erro ao obter o funcionário' };
        }
      }
      );
      
      // Rota para criar um novo funcionário (POST)
      app.post('/', async (request, reply) => {
        const createFuncionarioBodySchema = z.object({
          nome: z.string(),
          email: z.string(),
          senha: z.string(),
          telefone: z.string(),
          cargo: z.string(),
          salario: z.number(),
          data_contratacao: z.coerce.date(),
          papel_id: z.string(),
        });
        
        const {
          nome,
          email,
          senha,
          telefone,
          cargo,
          salario,
          data_contratacao,
          papel_id,
        } = createFuncionarioBodySchema.parse(request.body);
        
        try {
          const id = randomUUID(); // Gere um novo UUID para o funcionário
          await knex('funcionario').insert({
            id,
            nome,
            email,
            senha,
            telefone,
            cargo,
            salario,
            data_contratacao,
            papel_id,
          });
          return reply.status(201).send();
        } catch (error) {
          console.error(error);
          return reply.status(500).send('Erro ao criar o funcionário');
        }

      }
      );
      
      // Rota para atualizar funcionário por ID (PUT)
      app.put(
        '/:id',
        {
          preHandler: [checkSessionIdExists],
        },
        async (request, reply) => {
          const updateFuncionarioBodySchema = z.object({
            nome: z.string(),
            email: z.string(),
            senha: z.string(),
            telefone: z.string(),
            cargo: z.string(),
            salario: z.number(),
            data_contratacao: z.coerce.date(),
            papel_id: z.string(),
          });
          
          const {
            nome,
            email,
            senha,
            telefone,
            cargo,
            salario,
            data_contratacao,
            papel_id,
          } = updateFuncionarioBodySchema.parse(request.body);
          
          const { id } = request.params;
          
          try {
            // Verifica se o ID existe antes de atualizar
            const funcionario = await knex('funcionario')
            .where({ id })
            .first();
            
            if (!funcionario) {
              return reply.status(404).send('Funcionário não encontrado.');
            }
            
            await knex('funcionario')
            .where({ id })
            .update({
              nome,
              email,
              senha,
              telefone,
              cargo,
              salario,
              data_contratacao,
              papel_id,
            });
            
            return reply.status(204).send();
          } catch (error) {
            console.error(error);
            return reply.status(500).send('Erro ao atualizar o funcionário.');
          }
        }
        );
        
        // Rota para excluir funcionário por ID (DELETE)
        app.delete(
          '/:id',
          {
            preHandler: [checkSessionIdExists],
          },
          async (request, reply) => {
            const { id } = request.params;
            
            try {
              // Verifica se o ID existe antes de excluir
              const funcionario = await knex('funcionario')
              .where({ id })
              .first();
              
              if (!funcionario) {
                return reply.status(404).send('Funcionário não encontrado.');
              }
              
              await knex('funcionario')
              .where({ id })
              .del();
              
              return reply.status(204).send();
            } catch (error) {
              console.error(error);
              return reply.status(500).send('Erro ao excluir o funcionário.');
            }
          }
          );
        }
        