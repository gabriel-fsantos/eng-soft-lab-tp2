import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'

import { index,  show, create, update, destroy } from './controller'
import { schema } from './model'
export Funcionario, { schema } from './model'

const router = new Router()
const { email, senha, nome, cep, salario, cidade, estado, bairro, logradouro, telefone, dataContrato, especialidade, crm } = schema.tree

router.get('/',
  query(),
  index)

router.get('/:id',
  show)

router.post('/',
  body({ email, senha, nome, cep, salario, cidade, estado, bairro, logradouro, telefone, dataContrato, especialidade, crm }),
  create)

router.put('/:id',
  body({ nome, cep, salario, cidade, estado, bairro, logradouro, telefone, dataContrato, especialidade, crm }),
  update)

router.delete('/:id',
  destroy)

export default router
