var request = require('supertest')
var test = require('tape')

var config = require('../../knexfile')
var knex = require('knex')(config)

var app = require('../../server/app')

test.onFinish(() => process.exit(0))

test ('Commands api route test', t => {

  request(app)
    .get('/api/v1/commands')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if(err) console.log(err)
      else {

        var response = JSON.parse(res.text)

        t.true(Array.isArray(response))
        t.end()
      }
    })
})
