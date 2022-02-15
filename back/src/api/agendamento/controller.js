import { success, notFound } from '../../services/response/'
import { Agendamento } from '.'

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Agendamento.count(query)
    .then(count => agendamento.find(query, select, cursor)
      .then(agendamentos => ({
        rows: agendamentos.map((agendamento) => agendamento),
        count
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Agendamento.findById(params.id)
    .then(notFound(res))
    .then((user) => user)
    .then(success(res))
    .catch(next)

export const create = ({ bodymen: { body } }, res, next) => {
  Agendamento.create(body)
    .then((agendamento) => {
      console.log(agendamento)
      return agendamento})
    .then(success(res, 201))
    .catch((err) => {
      next(err)
    });
}

export const update = ({ bodymen: { body }, params, user }, res, next) =>
  Agendamento.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => result)
    .then((user) => user ? Object.assign(user, body).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Agendamento.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.remove() : null)
    .then(success(res, 204))
    .catch(next)
