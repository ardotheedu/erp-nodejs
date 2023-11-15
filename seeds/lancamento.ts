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
      data_vencimento: dayjs('23/07/2023', 'DD/MM/YYYY').format(),
      data_pagamento: dayjs('22/07/2023', 'DD/MM/YYYY').format(),
      valor: '243',
      metodo_pagamento: 'Cartão de crédito',
      status: 'em atraso',
    },
    {
      id: randomUUID(),
      id_nota: '233541231',
      data_vencimento: dayjs('31/08/2023', 'DD/MM/YYYY').format(),
      data_pagamento: dayjs('30/08/2023', 'DD/MM/YYYY').format(),
      valor: '453',
      metodo_pagamento: 'Cartão de débito',
      status: 'pagos',
    },
    {
      id: randomUUID(),
      id_nota: '543212345',
      data_vencimento: dayjs('15/09/2023', 'DD/MM/YYYY').format(),
      data_pagamento: dayjs('14/09/2023', 'DD/MM/YYYY').format(),
      valor: '320',
      metodo_pagamento: 'Boleto Bancário',
      status: 'a vencer',
    },
    {
      id: randomUUID(),
      id_nota: '543212345',
      data_vencimento: dayjs('30/10/2023', 'DD/MM/YYYY').format(),
      data_pagamento: dayjs('29/10/2023', 'DD/MM/YYYY').format(),
      valor: '120',
      metodo_pagamento: 'Transferência Bancária',
      status: 'em atraso',
    },
    {
      id: randomUUID(),
      id_nota: '123456789',
      data_vencimento: dayjs('05/11/2023', 'DD/MM/YYYY').format(),
      data_pagamento: dayjs('04/11/2023', 'DD/MM/YYYY').format(),
      valor: '750',
      metodo_pagamento: 'Dinheiro',
      status: 'a vencer',
    },
    {
      id: randomUUID(),
      id_nota: '123456789',
      data_vencimento: dayjs('20/12/2023', 'DD/MM/YYYY').format(),
      data_pagamento: dayjs('19/12/2023', 'DD/MM/YYYY').format(),
      valor: '620',
      metodo_pagamento: 'Pix',
      status: 'pagos',
    },
    {
      id: randomUUID(),
      id_nota: '987654321',
      data_vencimento: dayjs('10/01/2024', 'DD/MM/YYYY').format(),
      data_pagamento: dayjs('09/01/2024', 'DD/MM/YYYY').format(),
      valor: '325',
      metodo_pagamento: 'Cheque',
      status: 'em atraso',
    },
    {
      id: randomUUID(),
      id_nota: '987654321',
      data_vencimento: dayjs('25/02/2024', 'DD/MM/YYYY').format(),
      data_pagamento: dayjs('24/02/2024', 'DD/MM/YYYY').format(),
      valor: '430',
      metodo_pagamento: 'Transferência Bancária',
      status: 'a vencer',
    },
    {
      id: randomUUID(),
      id_nota: '789123456',
      data_vencimento: dayjs('15/03/2024', 'DD/MM/YYYY').format(),
      data_pagamento: dayjs('14/03/2024', 'DD/MM/YYYY').format(),
      valor: '275',
      metodo_pagamento: 'Cartão de débito',
      status: 'pagos',
    },
    {
      id: randomUUID(),
      id_nota: '789123456',
      data_vencimento: dayjs('30/04/2024', 'DD/MM/YYYY').format(),
      data_pagamento: dayjs('29/04/2024', 'DD/MM/YYYY').format(),
      valor: '510',
      metodo_pagamento: 'Cartão de crédito',
      status: 'em atraso',
    },
  ])
}
