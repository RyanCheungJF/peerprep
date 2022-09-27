import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())
import { getQuestion } from './controller/question-controller.js'

const router = express.Router()

router.get('/:difficulty', getQuestion)

app.use('/api/question', router).all((_, res) => {
  res.setHeader('content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8100, () => console.log('question-service listening on port 8100'))
