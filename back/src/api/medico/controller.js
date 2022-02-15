import { success, notFound } from '../../services/response/'
import { Medico } from '.'
import { sign } from '../../services/jwt'

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Medico.count(query)
    .then(count => Medico.find(query, select, cursor)
      .then(medicos => ({
        rows: medicos.map((medico) => medico.view()),
        count
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Medico.findById(params.id)
    .then(notFound(res))
    .then((medico) => medico ? medico.view() : null)
    .then(success(res))
    .catch(next)

export const showMe = ({ medico }, res) =>
  res.json(medico.view(true))

export const create = ({ bodymen: { body } }, res, next) =>
  Medico.create(body)
    .then(medico => {
      sign(medico.id)
        .then((token) => ({ token, medico: medico.view(true) }))
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

export const update = ({ bodymen: { body }, params, medico }, res, next) =>
  Medico.findById(params.id === 'me' ? medico.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isAdmin = medico.role === 'admin'
      const isSelfUpdate = medico.id === result.id
      if (!isSelfUpdate && !isAdmin) {
        res.status(401).json({
          valid: false,
          message: 'You can\'t change other medico\'s data'
        })
        return null
      }
      return result
    })
    .then((medico) => medico ? Object.assign(medico, body).save() : null)
    .then((medico) => medico ? medico.view(true) : null)
    .then(success(res))
    .catch(next)

export const updatePassword = ({ bodymen: { body }, params, medico }, res, next) =>
  Medico.findById(params.id === 'me' ? medico.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelfUpdate = medico.id === result.id
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'password',
          message: 'You can\'t change other medico\'s password'
        })
        return null
      }
      return result
    })
    .then((medico) => medico ? medico.set({ password: body.password }).save() : null)
    .then((medico) => medico ? medico.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Medico.findById(params.id)
    .then(notFound(res))
    .then((medico) => medico ? medico.remove() : null)
    .then(success(res, 204))
    .catch(next)
