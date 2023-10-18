import { FastifyRequest, FastifyReply } from 'fastify';
import { verify } from 'jsonwebtoken';

import { env } from '../env'



export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const token = request.headers.authorization;
    if (!token) {
      throw new Error('Token não fornecido');
    }

    const decodedToken: any = verify(token, env.SECRETKEY);
    request.user = decodedToken.user;
  } catch (error) {
    reply.status(401).send({ error: 'Falha na autenticação' });
    return;
  }
};