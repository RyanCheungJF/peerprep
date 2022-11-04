import express from 'express'
import cors from 'cors'
import {
  getQuestion,
  findQuestionById,
} from './controller/question-controller.js'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

const router = express.Router()

router.get('/', getQuestion)
router.get('/:qnsid', findQuestionById)

app.use('/api/question', router).all((_, res) => {
  res.setHeader('content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8100, () => console.log('question-service listening on port 8100'))

export default app
