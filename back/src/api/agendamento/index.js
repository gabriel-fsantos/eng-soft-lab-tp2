import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { index, create, update, destroy } from './controller'
import { schema } from './model'
export Agendamento, { schema } from './model'

const router = new Router()
const { especialidade, nomeMedico, dataConsulta, horarioConsulta, nome, email, telefone,  } = schema.tree

router.get('/',
  query(),
  index)

router.post('/',
  body({ especialidade, nomeMedico, dataConsulta, horarioConsulta, nome, email, telefone }),
  create)

router.put('/:id',
  body({ especialidade, nomeMedico, dataConsulta, horarioConsulta, nome, email, telefone }),
  update)

router.delete('/:id',
  destroy)

export default router
