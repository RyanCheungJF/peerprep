import app from '../index.js'
import chai from 'chai'
import chaiHttp from 'chai-http'

chai.should()
chai.use(chaiHttp)

// expected results as constants
const UUID = '636508fb1472225380f06506'
const UUID_SCORES = {
  codeCorrectness: 2,
  codeDesign: 3,
  codeStyle: 4,
  communicationStyle: 5,
  timeManagement: 1,
  totalReviews: 1,
  userId: '636508fb1472225380f06506',
}
const INCOMPLETE_BODY = {
  revieweeid: 'a',
  reviewerid: 'b',
  scores: [1, 2, 3, 4],
}

describe('API tests ', () => {
  describe('Test GET with valid id', () => {
    it('Expects to return a score', (done) => {
      chai
        .request(app)
        .get(`/api/review?userId=${UUID}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.eql(UUID_SCORES)
          done()
        })
    })
  })

  describe('Test GET with missing id', () => {
    it('Expects to return an error', (done) => {
      chai
        .request(app)
        .get('/api/review')
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.eql({ message: 'Missing user id' })
          done()
        })
    })
  })

  describe('Test POST with missing fields', () => {
    it('Expects to return an error', (done) => {
      chai
        .request(app)
        .post('/api/review')
        .send(INCOMPLETE_BODY)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.eql({
            message: 'Bad request, a field is missing!',
          })
          done()
        })
    })
  })
})
