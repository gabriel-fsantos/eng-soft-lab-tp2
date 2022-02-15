import mongoose, { Schema } from 'mongoose'

const agendamentoSchema = new Schema({
  especialidadeDesejada: {
    type: String
  },
  nomeMedico: {
    type: String
  },
  dataConsulta: {
    type: Date
  },
  horarioConsulta: {
    type: Date
  },
  nomePaciente: {
    type: String
  },
  email: {
    type: String  
  },
  telefone: {
    type: Number
  }
}, {
  timestamps: true
});

const model = mongoose.model('Agendamento', agendamentoSchema)

export const schema = model.schema
export default model
