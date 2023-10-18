import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('produto').del()

  // Inserts seed entries
  await knex('produto').insert([
    {
      id: 'b8febb2e-7f27-429b-8d54-d7c90b407c5f',
      nome: 'Produto 3',
      descricao: 'Descrição do Produto 3',
      preco_compra: 12.5,
      preco_venda: 18.0,
      quantidade: 10,
      data_validade: new Date().setDate(30),
      lote: 'loteABCDE123',
      produto_categoria_produto_id: '29a710ba-44e4-4db2-8ec1-6cbb25f96c99',
      produto_fornecedor_id: '5981fb3f-cce8-444c-b6b7-cbd65db1b183',
    },
    {
      id: '7dbed4c6-0d12-4a56-8efb-556cd7e6ef5e',
      nome: 'Produto 4',
      descricao: 'Descrição do Produto 4',
      preco_compra: 9.0,
      preco_venda: 14.5,
      quantidade: 8,
      data_validade: new Date().setDate(20),
      lote: 'loteXYZ789',
      produto_categoria_produto_id: 'c534a112-368f-4bb4-84c8-3f2519b5eb3d',
      produto_fornecedor_id: '1931a208-571e-4fb2-91ba-b807e2a5a122',
    },
    {
      id: 'a091aa4c-91c2-4c8b-b17d-87f810abe85e',
      nome: 'Produto 5',
      descricao: 'Descrição do Produto 5',
      preco_compra: 14.0,
      preco_venda: 20.0,
      quantidade: 15,
      data_validade: new Date().setDate(25),
      lote: 'lote123ABC45',
      produto_categoria_produto_id: 'fe2cd15a-8ea6-4a23-b9fd-0a1c6e26b60a',
      produto_fornecedor_id: '5981fb3f-cce8-444c-b6b7-cbd65db1b183',
    },
    {
      id: '0d325a4c-1fcb-48b7-a80d-fcb6dd9d6c6f',
      nome: 'Produto 6',
      descricao: 'Descrição do Produto 6',
      preco_compra: 11.0,
      preco_venda: 16.5,
      quantidade: 9,
      data_validade: new Date().setDate(18),
      lote: 'loteABC98765',
      produto_categoria_produto_id: 'ff219d54-d6ad-43a5-9e0a-3f24b0a6ea18',
      produto_fornecedor_id: '1931a208-571e-4fb2-91ba-b807e2a5a122',
    },
    {
      id: '3a89a27d-c1d7-49b1-b28c-abc7f72f8bba',
      nome: 'Produto 7',
      descricao: 'Descrição do Produto 7',
      preco_compra: 13.5,
      preco_venda: 19.0,
      quantidade: 12,
      data_validade: new Date().setDate(22),
      lote: 'loteXYZ45678',
      produto_categoria_produto_id: 'e47bb2db-55d2-4cf2-894e-ead152dd7de2',
      produto_fornecedor_id: '5981fb3f-cce8-444c-b6b7-cbd65db1b183',
    },
    {
      id: 'f68dd0c4-23b6-4a0c-a8c6-1b8ab54e8cda',
      nome: 'Produto 8',
      descricao: 'Descrição do Produto 8',
      preco_compra: 10.5,
      preco_venda: 15.5,
      quantidade: 7,
      data_validade: new Date().setDate(28),
      lote: 'lote123XYZ56',
      produto_categoria_produto_id: '291cc496-7dd7-463f-8377-0bd5457f7892',
      produto_fornecedor_id: '1931a208-571e-4fb2-91ba-b807e2a5a122',
    },
    {
      id: '76da84ed-2b13-4c93-8f9b-123fa18b9db2',
      nome: 'Produto 9',
      descricao: 'Descrição do Produto 9',
      preco_compra: 12.0,
      preco_venda: 17.0,
      quantidade: 6,
      data_validade: new Date().setDate(21),
      lote: 'loteABC98765',
      produto_categoria_produto_id: '9ba3e16f-e1b7-46b4-a1b3-ffb1bd174cec',
      produto_fornecedor_id: '5981fb3f-cce8-444c-b6b7-cbd65db1b183',
    },
    {
      id: '5e6a1c56-9822-44a6-bf13-1dd2bc7e9b16',
      nome: 'Produto 10',
      descricao: 'Descrição do Produto 10',
      preco_compra: 15.0,
      preco_venda: 20.5,
      quantidade: 11,
      data_validade: new Date().setDate(24),
      lote: 'loteXYZ12345',
      produto_categoria_produto_id: 'cc6b3a12-4b5e-4db7-9f1e-0a7d3e5c5dd2',
      produto_fornecedor_id: '1931a208-571e-4fb2-91ba-b807e2a5a122',
    },
    {
      id: '5e6a1c56-9822-44a6-bf13-1dd2bc7e9j16',
      nome: 'Produto 11',
      descricao: 'Descrição do Produto 11',
      preco_compra: 15.0,
      preco_venda: 20.5,
      quantidade: 11,
      data_validade: new Date().setDate(24),
      lote: 'loteXYZ12346',
      produto_categoria_produto_id: 'cc6b3a12-4b5e-4db7-9f1e-0a7d3e5c5dd4',
      produto_fornecedor_id: '1931a208-571e-4fb2-91ba-b807e2a5a192',
    },
    {
      id: '5e6a1c56-9822-44a6-bf13-1dd2bc7e9j15',
      nome: 'Produto 11',
      descricao: 'Descrição do Produto 11',
      preco_compra: 15.0,
      preco_venda: 20.5,
      quantidade: 11,
      data_validade: new Date().setDate(24),
      lote: 'loteXYZ12346',
      produto_categoria_produto_id: 'cc6b3a12-4b5e-4db7-9f1e-0a7d3e5c5dd4',
      produto_fornecedor_id: '1931a208-571e-4fb2-91ba-b807e2a5a192',
    },
  ])
}
