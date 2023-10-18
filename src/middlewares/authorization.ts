import { FastifyRequest, FastifyReply } from 'fastify';
import { UserRole } from './userRoles';

export const authorize = (role: UserRole) => {
  return (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
    const userRole: UserRole = request.user.role;

    if (userRole === role) {
      done();
    } else {
      reply.status(403).send({ error: 'Acesso negado' });
    }
  };
}