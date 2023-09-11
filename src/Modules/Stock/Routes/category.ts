import { FastifyInstance } from "fastify"

export async function categoryRoutes(app: FastifyInstance) {
    app.get(
      '/',
      async () => {
        return "Category Router is working"
      },
    )
  }