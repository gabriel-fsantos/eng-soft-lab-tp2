import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { index, create, update, destroy } from './controller'
import { schema } from './model'
export Endereco, { schema } from './model'

const router = new Router()
const { cep, logradouro, bairro, cidade, estado } = schema.tree

router.get('/',
  query(),
  index)

router.post('/',
  body({ cep, logradouro, bairro, cidade, estado }),
  create)

router.put('/:id',
  body({ cep, logradouro, bairro, cidade, estado }),
  update)

router.delete('/:id',
  destroy)

export default router
