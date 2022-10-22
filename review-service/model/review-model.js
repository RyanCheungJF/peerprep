import mongoose from 'mongoose'

var Schema = mongoose.Schema
let ReviewModelSchema = new Schema({
  revieweeid: {
    type: String,
    required: true,
  },
  reviewerid: {
    type: String,
    required: true,
  },
  scores: {
    type: [Number],
    required: true,
  },
})

export default mongoose.model('ReviewModel', ReviewModelSchema)
