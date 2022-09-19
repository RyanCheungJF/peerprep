import jwt from 'jsonwebtoken'
import { checkJWTExists } from '../model/redis-repository.js'

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')?.[1]
  if (!token) {
    return res.sendStatus(401)
  }

  // Also check blacklist
  if (await checkJWTExists(token)) {
    return res.sendStatus(403)
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, _) => {
    if (err) {
      return res.sendStatus(403)
    } else {
      req.token = token
      next()
    }
  })
}

export default authenticateToken
