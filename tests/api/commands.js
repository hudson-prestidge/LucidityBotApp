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

        var commands = JSON.parse(res.text)

        t.true(Array.isArray(commands), 'api route should return an array')
        t.equal(typeof commands[0], 'object', 'the returned array should contain objects')
        t.true(commands[0]['id'], 'the objects in the array should have an id key')
        t.true(commands[0]['name'], 'the objects in the array should have a name key')
        t.true(commands[0]['response'], 'the objects in the array should have a response key')
        t.end()
      }
    })
})
