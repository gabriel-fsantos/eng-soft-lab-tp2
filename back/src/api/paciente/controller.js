import { success, notFound } from '../../services/response/'
import { Paciente } from '.'
import { sign } from '../../services/jwt'

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Paciente.count(query)
    .then(count => Paciente.find(query, select, cursor)
      .then(pacientes => ({
        rows: pacientes.map((paciente) => paciente),
        count
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Paciente.findById(params.id)
    .then(notFound(res))
    .then((paciente) => paciente ? paciente.view() : null)
    .then(success(res))
    .catch(next)

export const showMe = ({ paciente }, res) =>
  res.json(paciente.view(true))

export const create = ({ bodymen: { body } }, res, next) =>
  Paciente.create(body)
    .then(paciente => {
      sign(paciente.id)
        .then((token) => ({ token, paciente: paciente.view(true) }))
        .then(success(res, 201))
    })
    .catch((err) => {
      /* istanbul ignore else */
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({
          valid: false,
          param: 'email',
          message: 'email already registered'
        })
      } else {
        next(err)
      }
    })

export const update = ({ bodymen: { body }, params, paciente }, res, next) =>
  Paciente.findById(params.id === 'me' ? paciente.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isAdmin = paciente.role === 'admin'
      const isSelfUpdate = paciente.id === result.id
      if (!isSelfUpdate && !isAdmin) {
        res.status(401).json({
          valid: false,
          message: 'You can\'t change other paciente\'s data'
        })
        return null
      }
      return result
    })
    .then((paciente) => paciente ? Object.assign(paciente, body).save() : null)
    .then((paciente) => paciente ? paciente.view(true) : null)
    .then(success(res))
    .catch(next)

export const updatePassword = ({ bodymen: { body }, params, paciente }, res, next) =>
  Paciente.findById(params.id === 'me' ? paciente.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelfUpdate = paciente.id === result.id
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'password',
          message: 'You can\'t change other paciente\'s password'
        })
        return null
      }
      return result
    })
    .then((paciente) => paciente ? paciente.set({ password: body.password }).save() : null)
    .then((paciente) => paciente ? paciente.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Paciente.findById(params.id)
    .then(notFound(res))
    .then((paciente) => paciente ? paciente.remove() : null)
    .then(success(res, 204))
    .catch(next)
