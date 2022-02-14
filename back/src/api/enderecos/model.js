import mongoose, { Schema } from 'mongoose'

const enderecoSchema = new Schema({
  cep: {
    type: String,
  },
  logradouro: {
    type: String,
  },
  bairro: {
    type: String,
  },
  cidade: {
    type: String,
  },
  estado: {
    type: String,
  }
}, {
  timestamps: true
});

const model = mongoose.model('Endereco', enderecoSchema)

export const schema = model.schema
export default model
