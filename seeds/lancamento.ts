import { randomUUID } from 'crypto'
import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('lancamento').del()

  await knex('lancamento').insert([
    {
      id: randomUUID(),
      id_nota: '233541231',
      data_vencimento: '23/07/2023',
      data_pagamento: '22/07/2023',
      valor: '243',
      metodo_pagamento: 'Cartão de crédito',
      status: 'em atraso',
    },
    {
      id: randomUUID(),
      id_nota: '233541231',
      data_vencimento: '31/08/2023',
      data_pagamento: '30/08/2023',
      valor: '453',
      metodo_pagamento: 'Cartão de débito',
      status: 'pagos',
    },
    {
      id: randomUUID(),
      id_nota: '543212345',
      data_vencimento: '15/09/2023',
      data_pagamento: '14/09/2023',
      valor: '320',
      metodo_pagamento: 'Boleto Bancário',
      status: 'a vencer',
    },
    {
      id: randomUUID(),
      id_nota: '543212345',
      data_vencimento: '30/10/2023',
      data_pagamento: '29/10/2023',
      valor: '120',
      metodo_pagamento: 'Transferência Bancária',
      status: 'em atraso',
    },
    {
      id: randomUUID(),
      id_nota: '123456789',
      data_vencimento: '05/11/2023',
      data_pagamento: '04/11/2023',
      valor: '750',
      metodo_pagamento: 'Dinheiro',
      status: 'a vencer',
    },
    {
      id: randomUUID(),
      id_nota: '123456789',
      data_vencimento: '20/12/2023',
      data_pagamento: '19/12/2023',
      valor: '620',
      metodo_pagamento: 'Pix',
      status: 'pagos',
    },
    {
      id: randomUUID(),
      id_nota: '987654321',
      data_vencimento: '10/01/2024',
      data_pagamento: '09/01/2024',
      valor: '325',
      metodo_pagamento: 'Cheque',
      status: 'em atraso',
    },
    {
      id: randomUUID(),
      id_nota: '987654321',
      data_vencimento: '25/02/2024',
      data_pagamento: '24/02/2024',
      valor: '430',
      metodo_pagamento: 'Transferência Bancária',
      status: 'a vencer',
    },
    {
      id: randomUUID(),
      id_nota: '789123456',
      data_vencimento: '15/03/2024',
      data_pagamento: '14/03/2024',
      valor: '275',
      metodo_pagamento: 'Cartão de débito',
      status: 'pagos',
    },
    {
      id: randomUUID(),
      id_nota: '789123456',
      data_vencimento: '30/04/2024',
      data_pagamento: '29/04/2024',
      valor: '510',
      metodo_pagamento: 'Cartão de crédito',
      status: 'em atraso',
    },
  ])
}
