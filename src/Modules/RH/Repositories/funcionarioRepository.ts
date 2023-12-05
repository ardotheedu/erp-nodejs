import { UUID, randomUUID } from 'node:crypto'
import { knex } from '../../../database'
import { funcionario } from '../Entities/funcionario'
import { sign } from 'jsonwebtoken'

interface funcionarioWithToken {
  user: funcionario
  token: string
}
export async function all(): Promise<funcionario[]> {
  const funcionario = await knex<funcionario>('funcionario').select()
  return funcionario
}

export async function login(
  email: string,
  senha: string,
): Promise<funcionarioWithToken> {
  const usuario = await knex('funcionario').where({ email }).first()

  if (!usuario) {
    return { error: 'Credenciais inválidas' }
    return
  }

  if (usuario.senha === senha) {
    const userPermission = await knex('funcionario')
      .select('permissao.nome')
      .leftJoin('permissao', 'funcionario.papel_id', 'permissao.id')
      .where('funcionario.id', usuario.id)
      .first()

    const token = sign(
      { user: { ...usuario, role: userPermission.nome } },
      env.SECRETKEY,
      { expiresIn: '1h' },
    )
    return { user: usuario, token }
  } else {
    return { error: 'Credenciais inválidas' }
  }
}

export async function getById(id: string): Promise<funcionario> {
  try {
    const funcionario = await knex('funcionario').where({ id }).first()

    if (funcionario) {
      return funcionario
    } else {
      return { error: 'Funcionário não encontrado' }
    }
  } catch (error) {
    console.error(error)
    return { error: 'Erro ao obter o funcionário' }
  }
}

export async function create(funcionario: funcionario): Promise<void> {
  funcionario.id = randomUUID()
  await knex('funcionario').insert({
    id: funcionario.id,
    nome: funcionario.nome,
    email: funcionario.email,
    senha: funcionario.senha,
    telefone: funcionario.telefone,
    cargo: funcionario.cargo,
    salario: funcionario.salario,
    data_contratacao: funcionario.data_contratacao,
    papel_id: funcionario.papel_id,
  })
}

export async function update(funcionario: funcionario): Promise<void> {
  await knex('funcionario').where({ id: funcionario.id }).update({
    nome: funcionario.nome,
    email: funcionario.email,
    senha: funcionario.senha,
    telefone: funcionario.telefone,
    cargo: funcionario.cargo,
    salario: funcionario.salario,
    data_contratacao: funcionario.data_contratacao,
    papel_id: funcionario.papel_id,
  })
}

export async function remove(id: string): Promise<boolean> {
  try {
    await knex('funcionario').where({ id }).del()
    return true
  } catch (error) {
    throw new Error('Erro ao deletar o funcionário')
  }
}
