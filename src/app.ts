import fastify from "fastify";
import cookie from "@fastify/cookie";

import * as routes from "./routes/index";

export const app = fastify();

app.register(cookie);

app.register(routes.rhRoutes, {
  prefix: "rh",
});
app.register(routes.registerStockRoutes, { prefix: "stock" });

app.register(routes.clienteRoutes, {
  prefix: "cliente",
});
app.register(routes.registerStockRoutes, { prefix: "stock1" });

app.register(routes.itemPedidoRoutes, {
  prefix: "item_pedido",
});
app.register(routes.registerStockRoutes, { prefix: "stock2" });

app.register(routes.pedidoRoutes, {
  prefix: "pedido",
});
app.register(routes.registerStockRoutes, { prefix: "stock3" });

app.register(routes.vendaSaidaRoutes, {
  prefix: "venda_saida",
});
app.register(routes.registerStockRoutes, { prefix: "stock4" });

app.register(routes.lancamentoRoutes, {
  prefix: "lancamento",
});
app.register(routes.registerStockRoutes, { prefix: "stock5" });
