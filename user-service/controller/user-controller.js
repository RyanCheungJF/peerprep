import {
  ormCreateUser as _createUser,
  ormDeleteUser as _deleteUser,
  ormFindUserByUsername as _findUserByUsername,
  ormCheckIfUserExists as _checkIfUserExists,
  ormUpdateUserPassword as _updateUserPassword,
  ormInvalidateJWT as _invalidateJWT,
  ormFindUserById as _findUserById,
} from '../model/user-orm.js'
import { deleteMatchRoom } from '../services/matching-service.js'
import { deleteCollabRoom } from '../services/collaboration-service.js'
import { invalidateReviewCache } from '../services/reviewService.js'
import { JWT_EXPIRY } from '../constants.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import 'dotenv/config'

export const getUser = async (req, res) => {
  const { userId } = req

  const user = await _findUserById(userId, { password: 0 })
  if (!user || user.err) {
    return res.status(500).json({ message: 'Error retrieving user.' })
  }

  return res.status(200).json(user)
}

export const createUser = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!(username && password)) {
      return res
        .status(400)
        .json({ message: 'Username and/or Password are missing!' })
    }
    if (!(await _checkIfUserExists(username))) {
      return res.status(409).json({ message: 'Username already exists!' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    if (await _createUser(username, hashedPassword).err) {
      return res.status(400).json({ message: 'Could not create a new user!' })
    } else {
      console.log(`Created new user ${username} successfully!`)
      return res
        .status(201)
        .json({ message: `Created new user ${username} successfully!` })
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Database failure when creating new user!' })
  }
}

export const deleteUser = async (req, res) => {
  const { username } = req.body
  if (!username) {
    return res.status(400).json({ message: 'Username missing!' })
  }

  const invalidationResult = await _invalidateJWT(req.token)
  if (!invalidationResult) {
    return res
      .status(500)
      .json({ message: 'Failed to invalidate user token. User not deleted.' })
  }

  // A serially-executed promise to delete the user's matching-svc room, which returns a room id,
  // and then delete the collab-svc room using that id
  const _deleteMatchAndCollabRooms = deleteMatchRoom(username).then(
    (response) => {
      const roomId = response.data?.room?.room_id

      if (roomId) {
        return deleteCollabRoom(roomId)
      } else {
        console.error(
          'No deleted room id returned from matching-svc. Likely a bad request or bug from matching-svc.'
        )
      }
    }
  )

  const [deleteUserResult, _] = await Promise.allSettled([
    _deleteUser(username),
    _deleteMatchAndCollabRooms,
  ])

  if (deleteUserResult) {
    return res
      .status(200)
      .json({ message: `Deleted user ${username} successfully` })
  }

  return res.status(500).json({
    message: 'Failed to delete user. User token has been invalidated anyway.',
  })
}

export const loginUser = async (req, res) => {
  const { username, password } = req.body
  if (!(username && password)) {
    return res
      .status(400)
      .json({ message: 'Username and/or Password are missing!' })
  }
  const user = await _findUserByUsername(username)
  if (user?.err) {
    return res.status(500).json({ message: 'ERROR: Could not log user in' })
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { userId: user._id.toString(), password },
      process.env.TOKEN_SECRET,
      {
        expiresIn: JWT_EXPIRY,
      }
    )
    return res.status(200).json({ userId: user._id, token })
  }
  return res.status(401).send('Invalid login credentials')
}

export const updateUserPassword = async (req, res) => {
  try {
    const { username, newPassword } = req.body
    if (!(username && newPassword)) {
      return res
        .status(400)
        .json({ message: 'Username and/or Password are missing!' })
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    if (await _updateUserPassword(username, hashedPassword).err) {
      return res
        .status(400)
        .json({ message: `Could not update password for ${username}` })
    } else {
      console.log(`Updated password for ${username} successfully!`)
      return res
        .status(201)
        .json({ message: `Updated password for ${username} successfully!` })
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Database failure when changing password!' })
  }
}

export const logoutUser = async (req, res) => {
  const [jwtInvalidationResult, _] = await Promise.allSettled([
    _invalidateJWT(req.token),
    invalidateReviewCache(req.userId),
  ])

  if (jwtInvalidationResult) {
    return res
      .status(200)
      .json({ messsage: 'User logged out - token invalidated.' })
  } else {
    return res.status(500).json({ message: 'Failed to invalidate user token' })
  }
}
