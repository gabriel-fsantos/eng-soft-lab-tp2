import { success, notFound } from '../../services/response/'
import { Funcionario } from '.'
import { sign } from '../../services/jwt'

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Funcionario.count(query)
    .then(count => Funcionario.find(query, select, cursor)
      .then(funcionarios => ({
        rows: funcionarios.map((funcionario) => funcionario.view()),
        count
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Funcionario.findById(params.id)
    .then(notFound(res))
    .then((funcionario) => funcionario ? funcionario.view() : null)
    .then(success(res))
    .catch(next)

export const showMe = ({ funcionario }, res) =>
  res.json(funcionario.view(true))

export const create = ({ bodymen: { body } }, res, next) =>
  Funcionario.create(body)
    .then(funcionario => {
      sign(funcionario.id)
        .then((token) => ({ token, funcionario: funcionario.view(true) }))
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

export const update = ({ bodymen: { body }, params, funcionario }, res, next) =>
  Funcionario.findById(params.id === 'me' ? funcionario.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isAdmin = funcionario.role === 'admin'
      const isSelfUpdate = funcionario.id === result.id
      if (!isSelfUpdate && !isAdmin) {
        res.status(401).json({
          valid: false,
          message: 'You can\'t change other funcionario\'s data'
        })
        return null
      }
      return result
    })
    .then((funcionario) => funcionario ? Object.assign(funcionario, body).save() : null)
    .then((funcionario) => funcionario ? funcionario.view(true) : null)
    .then(success(res))
    .catch(next)

export const updatePassword = ({ bodymen: { body }, params, funcionario }, res, next) =>
  Funcionario.findById(params.id === 'me' ? funcionario.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelfUpdate = funcionario.id === result.id
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'password',
          message: 'You can\'t change other funcionario\'s password'
        })
        return null
      }
      return result
    })
    .then((funcionario) => funcionario ? funcionario.set({ password: body.password }).save() : null)
    .then((funcionario) => funcionario ? funcionario.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Funcionario.findById(params.id)
    .then(notFound(res))
    .then((funcionario) => funcionario ? funcionario.remove() : null)
    .then(success(res, 204))
    .catch(next)
