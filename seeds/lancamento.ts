import { randomUUID } from 'crypto'
import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('lancamento').del()

  await knex('lancamento').insert([
    {
      id: randomUUID(),
      data_de_vencimento: '23/07/2023',
      data_de_pagamento: '22/07/2023',
      valor: '243',
      metodo_pagamento: 'Cartão de credito',
      numero_nota: '080819482307200234',
    },
    {
      id: randomUUID(),
      data_de_vencimento: '31/08/2023',
      data_de_pagamento: '30/08/2023',
      valor: '453',
      metodo_pagamento: 'Cartão de débito',
      numero_nota: '09123456482302598752',
    },
  ])
}
