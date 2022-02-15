import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'

const roles = ['paciente', 'admin']

const pacienteSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  telefone: {
    type: String,
    required: true,
  },
  cep: {
    type: String,
    required: true,
    minlength: 6
  },
  logradouro: {
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
  }
}, {
  timestamps: true
})

pacienteSchema.methods = {
  view (full) {
    const view = {}
    let fields = ['id', 'nome']

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
pacienteSchema.plugin(mongooseKeywords, { paths: ['email', 'nome'] })

const model = mongoose.model('Paciente', pacienteSchema)

export const schema = model.schema
export default model
