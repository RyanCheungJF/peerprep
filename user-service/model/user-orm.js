import {
  createUser,
  findUser,
  checkIfUserExists,
  updateUserPassword,
} from './repository.js'

// need to separate orm functions from repository to decouple business logic from persistence
export const ormCreateUser = async (username, password) => {
  try {
    const newUser = await createUser({ username, password })
    newUser.save()
    return true
  } catch (err) {
    console.log('ERROR: Could not create new user')
    return { err }
  }
}

export const ormFindUserByUsername = async (username) => {
  try {
    return await findUser({ username })
  } catch (err) {
    console.log('ERROR: Could not query for user')
    return { err }
  }
}

export const ormCheckIfUserExists = async (username) => {
  try {
    const userIsFound = await checkIfUserExists({ username })
    return userIsFound ? false : true
  } catch (err) {
    console.log('ERROR: Could not check if user exists')
    return { err }
  }
}

export const ormUpdateUserPassword = async (username, newPassword) => {
  try {
    return await updateUserPassword(username, { password: newPassword })
  } catch (err) {
    console.log(`ERROR: Could not update password for ${username}`)
    return { err }
  }
}
