import mongoose from 'mongoose'

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId
let ReviewModelSchema = new Schema({
  revieweeid: {
    type: ObjectId,
    required: true,
    index: true,
  },
  reviewerid: {
    type: ObjectId,
    required: true,
  },
  scores: {
    type: [Number],
    required: true,
  },
})

export default mongoose.model('ReviewModel', ReviewModelSchema)
