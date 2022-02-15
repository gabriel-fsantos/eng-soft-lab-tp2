import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

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
    type: Date,
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

  authenticate (password) {
    return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
  }

}

funcionarioSchema.plugin(mongooseKeywords, { paths: ['email', 'nome'] })

const model = mongoose.model('Funcionario', funcionarioSchema)

export const schema = model.schema
export default model
