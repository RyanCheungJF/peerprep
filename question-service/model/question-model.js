import mongoose from 'mongoose'

var Schema = mongoose.Schema
let QuestionModelSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  qnsid: {
    type: Number,
    required: true,
    unique: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ex_1_input: {
    type: String,
  },
  ex_1_output: {
    type: String,
  },
  ex_1_explanation: {
    type: String,
  },
  ex_2_input: {
    type: String,
  },
  ex_2_output: {
    type: String,
  },
  ex_2_explanation: {
    type: String,
  },
  ex_3_input: {
    type: String,
  },
  ex_3_output: {
    type: String,
  },
  ex_3_explanation: {
    type: String,
  },
})

export default mongoose.model('QuestionModel', QuestionModelSchema)
