import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { knex } from '../database';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function itemPedidoRoutes(app: FastifyInstance) {
  app.get('/', async (request) => {
    const itensPedido = await knex('item_pedido').select();
    return { itensPedido };
  });

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const getItemPedidoParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getItemPedidoParamsSchema.parse(request.params);

      const itemPedido = await knex('item_pedido')
        .where({ id })
        .first();

      return { itemPedido };
    }
  );

  app.post('/', async (request, reply) => {
    const createItemPedidoBodySchema = z.object({
      pedido_id_item: z.string(),
      produto_id: z.string(),
      quantidade: z.number(),
      preco_unitario: z.number(),
    });

    try {
      const { pedido_id_item, produto_id, quantidade, preco_unitario } =
        createItemPedidoBodySchema.parse(request.body);

      const id = randomUUID();

      await knex('item_pedido').insert({
        id,
        pedido_id_item,
        produto_id,
        quantidade,
        preco_unitario,
      });

      return reply.status(201).send({ message: 'Item inserido com sucesso no pedido!' });
    } catch (error) {
      return reply.status(400).send({ message: 'Erro ao cadastrar item no pedido.' });
    }
  });

  // Rota para atualizar um item de pedido por ID (PUT)
  app.put('/:id', async (request, reply) => {
    const updateItemPedidoParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const updateItemPedidoBodySchema = z.object({
      pedido_id_item: z.string(),
      produto_id: z.string(),
      quantidade: z.number(),
      preco_unitario: z.number(),
    });

    try {
      const { id } = updateItemPedidoParamsSchema.parse(request.params);
      const { pedido_id_item, produto_id, quantidade, preco_unitario } =
        updateItemPedidoBodySchema.parse(request.body);

      const updatedItemPedido = {
        pedido_id_item,
        produto_id,
        quantidade,
        preco_unitario,
      };

      await knex('item_pedido').where({ id }).update(updatedItemPedido);

      return reply.status(200).send({ message: 'Item de pedido atualizado com sucesso!' });
    } catch (error) {
      return reply.status(400).send({ message: 'Erro ao atualizar item de pedido.' });
    }
  });

  // Rota para excluir um item de pedido por ID (DELETE)
  app.delete('/:id', async (request, reply) => {
    const deleteItemPedidoParamsSchema = z.object({
      id: z.string().uuid(),
    });

    try {
      const { id } = deleteItemPedidoParamsSchema.parse(request.params);

      await knex('item_pedido').where({ id }).del();

      return reply.status(200).send({ message: 'Item de pedido excluído com sucesso!' });
    } catch (error) {
      return reply.status(400).send({ message: 'Erro ao excluir item de pedido.' });
    }
  });
}
