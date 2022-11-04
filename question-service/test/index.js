import app from '../index.js'
import chai from 'chai'
import chaiHttp from 'chai-http'

chai.should()
chai.use(chaiHttp)

describe('API tests', () => {
  describe('Test valid difficulty', () => {
    it('Expects to return a hard question', (done) => {
      chai
        .request(app)
        .get('/api/question?difficulty=hard')
        .end((err, res) => {
          res.should.have.status(200)
          chai.expect(res.body).include({ difficulty: 'hard' })
          done()
        })
    })
  })

  describe('Test invalid difficulty', () => {
    it('Expects to return an error', (done) => {
      chai
        .request(app)
        .get('/api/question?difficulty=superhard')
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.eql({
            message: 'Invalid query parameter supplied.',
          })
          done()
        })
    })
  })
})
