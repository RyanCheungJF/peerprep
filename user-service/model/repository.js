import UserModel from './user-model.js'
import 'dotenv/config'

// Set up mongoose connection
import mongoose from 'mongoose'

let mongoDB =
  process.env.ENV == 'PROD'
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

export const createUser = async (params) => {
  return new UserModel(params)
}

export const findUser = async (query) => {
  return UserModel.findOne(query)
}

export const checkIfUserExists = async (query) => {
  return UserModel.exists(query)
}

export const updateUserPassword = async (id, query) => {
  return UserModel.findByIdAndUpdate(id, query)
}
