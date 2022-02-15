import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { password as passwordAuth, master, token } from '../../services/passport'
import { index, showMe, show, create, update, updatePassword, destroy } from './controller'
import { schema } from './model'
export Paciente, { schema } from './model'

const router = new Router()
const { email, password, name, picture, role, CEP, logadouro, bairro, cidade, estado, peso, altura, tipoSanguineo } = schema.tree

/**
 * @api {get} /Pacientes Retrieve Pacientes
 * @apiName RetrievePacientes
 * @apiGroup Paciente
 * @apiPermission admin
 * @apiParam {String} access_token Paciente access_token.
 * @apiUse listParams
 * @apiSuccess {Object[]} Pacientes List of Pacientes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /Pacientes/me Retrieve current Paciente
 * @apiName RetrieveCurrentPaciente
 * @apiGroup Paciente
 * @apiPermission Paciente
 * @apiParam {String} access_token Paciente access_token.
 * @apiSuccess {Object} Paciente Paciente's data.
 */
router.get('/me',
  token({ required: true }),
  showMe)

/**
 * @api {get} /Pacientes/:id Retrieve Paciente
 * @apiName RetrievePaciente
 * @apiGroup Paciente
 * @apiPermission public
 * @apiSuccess {Object} Paciente Paciente's data.
 * @apiError 404 Paciente not found.
 */
router.get('/:id',
  show)

/**
 * @api {post} /Pacientes Create Paciente
 * @apiName CreatePaciente
 * @apiGroup Paciente
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} email Paciente's email.
 * @apiParam {String{6..}} password Paciente's password.
 * @apiParam {String} [name] Paciente's name.
 * @apiParam {String} [picture] Paciente's picture.
 * @apiParam {String=Paciente,admin} [role=Paciente] Paciente's role.
 * @apiSuccess (Sucess 201) {Object} Paciente Paciente's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiError 409 Email already registered.
 */
router.post('/',
  master(),
  body({ email, password, name, picture, role ,CEP, logadouro, bairro, cidade, estado, peso, altura, tipoSanguineo }),
  create)

/**
 * @api {put} /Pacientes/:id Update Paciente
 * @apiName UpdatePaciente
 * @apiGroup Paciente
 * @apiPermission Paciente
 * @apiParam {String} access_token Paciente access_token.
 * @apiParam {String} [name] Paciente's name.
 * @apiParam {String} [picture] Paciente's picture.
 * @apiSuccess {Object} Paciente Paciente's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current Paciente or admin access only.
 * @apiError 404 Paciente not found.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, picture }),
  update)

/**
 * @api {put} /Pacientes/:id/password Update password
 * @apiName UpdatePassword
 * @apiGroup Paciente
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiParam {String{6..}} password Paciente's new password.
 * @apiSuccess (Success 201) {Object} Paciente Paciente's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current Paciente access only.
 * @apiError 404 Paciente not found.
 */
router.put('/:id/password',
  passwordAuth(),
  body({ password }),
  updatePassword)

/**
 * @api {delete} /Pacientes/:id Delete Paciente
 * @apiName DeletePaciente
 * @apiGroup Paciente
 * @apiPermission admin
 * @apiParam {String} access_token Paciente access_token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 Paciente not found.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
