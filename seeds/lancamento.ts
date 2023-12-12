import { randomUUID } from 'crypto'
import { Knex } from 'knex'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)
export async function seed(knex: Knex): Promise<void> {
  await knex('lancamento').del()

  await knex('lancamento').insert([
    {
      id: randomUUID(),
      id_nota: '233541231',
      data_vencimento: dayjs('2023/07/23', 'YYYY/MM/DD').format(),
      data_pagamento: dayjs('2023/07/22', 'YYYY/MM/DD').format(),
      valor: '243',
      metodo_pagamento: 'Cartão de crédito',
      status: 'em atraso',
    },
    {
      id: randomUUID(),
      id_nota: '233541231',
      data_vencimento: dayjs('2023/08/31', 'YYYY/MM/DD').format(),
      data_pagamento: dayjs('2023/08/30', 'YYYY/MM/DD').format(),
      valor: '453',
      metodo_pagamento: 'Cartão de débito',
      status: 'pagos',
    },
    {
      id: randomUUID(),
      id_nota: '543212345',
      data_vencimento: dayjs('2023/09/15', 'YYYY/MM/DD').format(),
      data_pagamento: dayjs('2023/09/14', 'YYYY/MM/DD').format(),
      valor: '320',
      metodo_pagamento: 'Boleto Bancário',
      status: 'a vencer',
    },
    {
      id: randomUUID(),
      id_nota: '543212345',
      data_vencimento: dayjs('2023/10/30', 'YYYY/MM/DD').format(),
      data_pagamento: dayjs('2023/10/29', 'YYYY/MM/DD').format(),
      valor: '120',
      metodo_pagamento: 'Transferência Bancária',
      status: 'em atraso',
    },
    {
      id: randomUUID(),
      id_nota: '123456789',
      data_vencimento: dayjs('2023/11/05', 'YYYY/MM/DD').format(),
      data_pagamento: dayjs('2023/11/04', 'YYYY/MM/DD').format(),
      valor: '750',
      metodo_pagamento: 'Dinheiro',
      status: 'a vencer',
    },
    {
      id: randomUUID(),
      id_nota: '123456789',
      data_vencimento: dayjs('2023/12/20', 'YYYY/MM/DD').format(),
      data_pagamento: dayjs('2023/12/19', 'YYYY/MM/DD').format(),
      valor: '620',
      metodo_pagamento: 'Pix',
      status: 'pagos',
    },
    {
      id: randomUUID(),
      id_nota: '987654321',
      data_vencimento: dayjs('2024/01/10', 'YYYY/MM/DD').format(),
      data_pagamento: dayjs('2024/01/09', 'YYYY/MM/DD').format(),
      valor: '325',
      metodo_pagamento: 'Cheque',
      status: 'em atraso',
    },
    {
      id: randomUUID(),
      id_nota: '987654321',
      data_vencimento: dayjs('2024/02/25', 'YYYY/MM/DD').format(),
      data_pagamento: dayjs('2024/02/24', 'YYYY/MM/DD').format(),
      valor: '430',
      metodo_pagamento: 'Transferência Bancária',
      status: 'a vencer',
    },
    {
      id: randomUUID(),
      id_nota: '789123456',
      data_vencimento: dayjs('2024/03/15', 'YYYY/MM/DD').format(),
      data_pagamento: dayjs('2024/03/14', 'YYYY/MM/DD').format(),
      valor: '275',
      metodo_pagamento: 'Cartão de débito',
      status: 'pagos',
    },
    {
      id: randomUUID(),
      id_nota: '789123456',
      data_vencimento: dayjs('2024/04/30', 'YYYY/MM/DD').format(),
      data_pagamento: dayjs('2024/04/29', 'YYYY/MM/DD').format(),
      valor: '510',
      metodo_pagamento: 'Cartão de crédito',
      status: 'em atraso',
    },
  ])
}
