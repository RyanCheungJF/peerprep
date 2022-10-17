import express from 'express'
import cors from 'cors'
import authenticateToken from './middleware/auth.js'
import {
  getUser,
  createUser,
  loginUser,
  logoutUser,
  deleteUser,
  updateUserPassword,
} from './controller/user-controller.js'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

const router = express.Router()

// Controller will contain all the User-defined Routes
router.get('/', authenticateToken, getUser)
router.post('/', createUser)
router.put('/', authenticateToken, updateUserPassword)
router.delete('/', authenticateToken, deleteUser)
router.post('/login', loginUser)
router.post('/logout', authenticateToken, logoutUser)

app.use('/api/user', router).all((_, res) => {
  res.setHeader('content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8000, () => console.log('user-service listening on port 8000'))
