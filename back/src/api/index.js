import { Router } from 'express'

import user from './user'
import auth from './auth'
import endereco from './enderecos'
import funcionario from './funcionario'
import paciente from './paciente'

const router = new Router()

router.use('/paciente', paciente)
router.use('/funcionario', funcionario)
router.use('/endereco', endereco)
router.use('/users', user)
router.use('/auth', auth)

export default router
