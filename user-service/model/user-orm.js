import {
  createUser,
  deleteUser,
  findUser,
  checkIfUserExists,
  updateUserPassword,
} from './repository.js'
import {
  addJWT as addJWTToRedis,
  checkJWTExists as checkJWTExistsRedis,
  getCurrUserJWT as getCurrUserJWTRedis,
  setCurrUserJWT as setCurrUserJWTRedis,
} from './redis-repository.js'

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

export const ormDeleteUser = async (username) => {
  try {
    return await deleteUser({ username })
  } catch (err) {
    console.log('ERROR: Could not delete user')
    return { err }
  }
}

export const ormFindUserById = async (id, projection) => {
  try {
    return await findUser({ _id: id }, projection)
  } catch (err) {
    console.log('ERROR: Could not query for user')
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

// ---------------- Redis ORM methods ----------------- //
export const ormInvalidateJWT = async (token) => {
  try {
    return addJWTToRedis(token)
  } catch (err) {
    console.log('ERROR: Could not save JWT to redis blacklist')
    return { err }
  }
}

export const ormIsJWTValid = async (token) => {
  try {
    return !checkJWTExistsRedis(token)
  } catch (err) {
    console.log('ERROR: Could not query redis JWT blacklist')
    return { err }
  }
}

/**
 * Ensures that a user only has one valid JWT at any given time (which is the given token).
 * This prevents a user from using the app on multiple devices at the same time.
 */
export const ormRestrictJWT = async (userId, token) => {
  try {
    const currJWT = await getCurrUserJWTRedis(userId)
    if (currJWT) {
      await ormInvalidateJWT(currJWT)
    }

    return setCurrUserJWTRedis(userId, token)
  } catch (err) {
    console.log('ERROR: Could not restrict JWT in Redis:', err)
    return { err }
  }
}
