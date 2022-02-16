import mongoose, { Schema } from 'mongoose'

const agendamentoSchema = new Schema({
  nome: {
    type: String
  },
  email: {
    type: String
  },
  telefone: {
    type: String
  },
  especialidade: {
    type: String
  },
  nomeMedico: {
    type: String
  },
  dataConsulta: {
    type: String
  },
  horarioConsulta: {
    type: String
  },
}, {
  timestamps: true
});

const model = mongoose.model('Agendamento', agendamentoSchema)

export const schema = model.schema
export default model
