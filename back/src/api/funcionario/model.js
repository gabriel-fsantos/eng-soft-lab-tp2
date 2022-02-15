import crypto from 'crypto'
import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'
import internal from 'stream'

const roles = ['funcionario', 'admin']

const funcionarioSchema = new Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  CEP:{
      type: String,
      required: true,
      minlength: 6,
      maxlength: 8
  },
  salario:{
    type: String,
    required: true,
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
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 11
  },
  logadouro: {
    type: String,
    required: true,
    minlength: 6
  },
  dataInicioDeContrato: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    index: true,
    trim: true
  },
  role: {
    type: String,
    enum: roles,
    default: 'funcionario'
  },
  picture: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})

funcionarioSchema.path('email').set(function (email) {
  if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
    const hash = crypto.createHash('md5').update(email).digest('hex')
    this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`
  }

  if (!this.name) {
    this.name = email.replace(/^(.+)@.+$/, '$1')
  }

  return email
})

funcionarioSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  /* istanbul ignore next */
  const rounds = env === 'test' ? 1 : 9

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash
    next()
  }).catch(next)
})

funcionarioSchema.methods = {
  view (full) {
    const view = {}
    let fields = ['id', 'name', 'picture']

    if (full) {
      fields = [...fields, 'email', 'createdAt']
    }

    fields.forEach((field) => { view[field] = this[field] })

    return view
  },

  authenticate (password) {
    return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
  }

}

funcionarioSchema.statics = {
  roles
}

funcionarioSchema.plugin(mongooseKeywords, { paths: ['email', 'name'] })

const model = mongoose.model('Funcionario', funcionarioSchema)

export const schema = model.schema
export default model
