import { success, notFound } from '../../services/response/'
import { Endereco } from '.'

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Endereco.count(query)
    .then(count => endereco.find(query, select, cursor)
      .then(enderecos => ({
        rows: enderecos.map((endereco) => endereco),
        count
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Endereco.findById(params.id)
    .then(notFound(res))
    .then((user) => user)
    .then(success(res))
    .catch(next)

export const create = ({ bodymen: { body } }, res, next) => {
  Endereco.create(body)
    .then((endereco) => {
      console.log(endereco)
      return endereco})
    .then(success(res, 201))
    .catch((err) => {
      next(err)
    });
}

export const update = ({ bodymen: { body }, params, user }, res, next) =>
  Endereco.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => result)
    .then((user) => user ? Object.assign(user, body).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Endereco.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.remove() : null)
    .then(success(res, 204))
    .catch(next)
