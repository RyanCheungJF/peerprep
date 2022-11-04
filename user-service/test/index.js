import app from '../index.js'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

chai.should()
chai.use(chaiHttp)

// expected results as constants
const LOGIN_DETAILS = {
  username: 'passwordis123',
  password: '123',
}
const UPDATE_LOGIN_DETAILS = {
  username: 'testsuite',
  password: '1234567890qwertyuioplkjhgfdsazxcvbnm',
}
const MISSING_LOGIN_DETAILS = {
  username: 'passwordis123',
}
const INVALID_LOGIN_DETAILS = {
  username: 'passwordis123',
  password: '122',
}

describe('API tests ', () => {
  describe('Test valid login', () => {
    it('Expects to return a token', (done) => {
      chai
        .request(app)
        .post(`/api/user/login`)
        .send(LOGIN_DETAILS)
        .end((err, res) => {
          res.should.have.status(200)
          expect(res.body).have.property('token')
          done()
        })
    })
  })

  describe('Test missing field', () => {
    it('Expects to return an error', (done) => {
      chai
        .request(app)
        .post(`/api/user/login`)
        .send(MISSING_LOGIN_DETAILS)
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
  })

  describe('Test invalid login', () => {
    it('Expects to return an error', (done) => {
      chai
        .request(app)
        .post(`/api/user/login`)
        .send(INVALID_LOGIN_DETAILS)
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
  })
})
