import { Router } from 'express'

import user from './user'
import auth from './auth'
import endereco from './enderecos'

const router = new Router()

router.use('/endereco', endereco)
router.use('/users', user)
router.use('/auth', auth)

export default router
