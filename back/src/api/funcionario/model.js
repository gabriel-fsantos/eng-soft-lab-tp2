import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'

const funcionarioSchema = new Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  cep:{
    type: String,
    required: true,
    minlength: 6,
    maxlength: 8
  },
  especialidade: {
    type: String,
    minlength: 5
  },
  crm: {
    type: String,
    minlength: 5
  },
  salario:{
    type: String,
    required: true
  },
  bairro:{
    type: String,
    required: true,
    minlength: 3
  },
  cidade: {
    type: String,
    required: true,
    minlength: 3
  },
  estado: {
    type: String,
    required: true,
    minlength: 3
  },
  telefone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 11
  },
  logradouro: {
    type: String,
    required: true,
    minlength: 6
  },
  dataContrato: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true,
    minlength: 6
  },
  nome: {
    type: String,
    index: true,
    trim: true
  }
}, {
  timestamps: true
})

funcionarioSchema.pre('save', function (next) {
  if (!this.isModified('senha')) return next()

  /* istanbul ignore next */
  const rounds = env === 'test' ? 1 : 9

  bcrypt.hash(this.senha, rounds).then((hash) => {
    this.senha = hash
    next()
  }).catch(next)
})

funcionarioSchema.methods = {
  view (full) {
    const view = {}
    let fields = ['id', 'name']

    if (full) {
      fields = [...fields, 'email', 'createdAt']
    }

    fields.forEach((field) => { view[field] = this[field] })

    return view
  },

  authenticate (senha) {
    return bcrypt.compare(senha, this.senha).then((valid) => valid ? this : false)
  }

}

funcionarioSchema.plugin(mongooseKeywords, { paths: ['email', 'nome'] })

const model = mongoose.model('Funcionario', funcionarioSchema)

export const schema = model.schema
export default model
