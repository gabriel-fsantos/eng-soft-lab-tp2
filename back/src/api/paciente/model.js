import crypto from 'crypto'
import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'

const roles = ['paciente', 'admin']

const pacienteSchema = new Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  telefone:{
    type: Number,
    required: true,
    minlength: 8
  },
  CEP: {
    type: String,
    required: true,
    minlength: 6
  },
  logadouro: {
    type: String,
    required: true,
    minlength: 5
  },
  bairro: {
    type: String,
    required: true
  },
  cidade: {
    type: String,
    required: true
  }, 
  estado: {
    type: String,
    required: true
  },
  peso: {
    type: String,
    required: true
  },
  altura: {
    type: String,
    required: true
  },
  tipoSanguineo: {
    type: String,
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
    default: 'paciente'
  },
  picture: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})

pacienteSchema.path('email').set(function (email) {
  if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
    const hash = crypto.createHash('md5').update(email).digest('hex')
    this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`
  }

  if (!this.name) {
    this.name = email.replace(/^(.+)@.+$/, '$1')
  }

  return email
})

pacienteSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  /* istanbul ignore next */
  const rounds = env === 'test' ? 1 : 9

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash
    next()
  }).catch(next)
})

pacienteSchema.methods = {
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

pacienteSchema.statics = {
  roles
}

pacienteSchema.plugin(mongooseKeywords, { paths: ['email', 'name'] })

const model = mongoose.model('Paciente', pacienteSchema)

export const schema = model.schema
export default model
