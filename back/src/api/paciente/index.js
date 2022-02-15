import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { password as passwordAuth, master, token } from '../../services/passport'
import { index, showMe, show, create, update, updatePassword, destroy } from './controller'
import { schema } from './model'
export Paciente, { schema } from './model'

const router = new Router()
const { email, senha, nome, cep, logradouro, bairro, cidade, estado, peso, altura, tipoSanguineo, telefone } = schema.tree

router.get('/',
  query(),
  index)

router.get('/me',
  showMe)

router.get('/:id',
  show)

router.post('/',
  body({ email, senha, nome, cep, logradouro, bairro, cidade, estado, peso, altura, tipoSanguineo, telefone }),
  create)

router.put('/:id',
  body({ email, senha, nome, cep, logradouro, bairro, cidade, estado, peso, altura, tipoSanguineo, telefone }),
  update)

router.put('/:id/password',
  passwordAuth(),
  body({ senha }),
  updatePassword)

router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
