import express from 'express'
import cors from 'cors'
import {
  getUserScores,
  createScores,
  deleteUserScoresFromCache,
  deleteUserScoresFromDatabase,
} from './controller/review-controller.js'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

const router = express.Router()

router.get('/', getUserScores)
router.post('/', createScores)
router.delete('/cache', deleteUserScoresFromCache)
router.delete('/database', deleteUserScoresFromDatabase)

app.use('/api/review', router).all((_, res) => {
  res.setHeader('content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8500, () => console.log('review-service listening on port 8500'))
