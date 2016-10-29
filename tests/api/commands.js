var request = require('supertest')
var test = require('tape')

var config = require('../../knexfile')
var knex = require('knex')(config)

var app = require('../../server/app')

test.onFinish(() => process.exit(0))

test ('/api/v1/commands api get route test', t => {

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
        t.true(commands[0].hasOwnProperty('id'), 'the objects in the array should have an id key')
        t.true(commands[0].hasOwnProperty('name'), 'the objects in the array should have an name key')
        t.true(commands[0].hasOwnProperty('trigger'), 'the objects in the array should have an trigger key')
        t.true(commands[0].hasOwnProperty('response'), 'the objects in the array should have an response key')
        t.end()
      }
    })
})

test ('/api/v1/commands/regularcommands api get route test', t => {

  request(app)
    .get('/api/v1/commands/regularcommands')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if(err) console.log(err)
      else {

        var commands = JSON.parse(res.text)

        t.true(Array.isArray(commands), 'api route should return an array')
        t.equal(typeof commands[0], 'object', 'the returned array should contain objects')
        t.true(commands[0].hasOwnProperty('id'), 'the objects in the array should have an id key')
        t.true(commands[0].hasOwnProperty('name'), 'the objects in the array should have an name key')
        t.true(commands[0].hasOwnProperty('trigger'), 'the objects in the array should have an trigger key')
        t.equal(commands[0]['trigger'], false, 'the trigger key should be set to false')
        t.true(commands[0].hasOwnProperty('response'), 'the objects in the array should have an response key')
        t.end()
      }
    })
})

test ('/api/v1/commands/triggerphrases api get route test', t => {

  request(app)
    .get('/api/v1/commands/triggerphrases')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if(err) console.log(err)
      else {

        var commands = JSON.parse(res.text)

        t.true(Array.isArray(commands), 'api route should return an array')
        t.equal(typeof commands[0], 'object', 'the returned array should contain objects')
        t.true(commands[0].hasOwnProperty('id'), 'the objects in the array should have an id key')
        t.true(commands[0].hasOwnProperty('name'), 'the objects in the array should have an name key')
        t.true(commands[0].hasOwnProperty('trigger'), 'the objects in the array should have an trigger key')
        t.equal(commands[0]['trigger'], true, 'the trigger key should be set to true')
        t.true(commands[0].hasOwnProperty('response'), 'the objects in the array should have an response key')
        t.end()
      }
    })
})

test ('/api/v1/commands/scheduledcommands get api route test', t => {

  request(app)
    .get('/api/v1/commands/scheduledcommands')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if(err) console.log(err)
      else {

        var commands = JSON.parse(res.text)

        t.true(Array.isArray(commands), 'api route should return an array')
        t.equal(typeof commands[0], 'object', 'the returned array should contain objects')
        t.true(commands[0].hasOwnProperty('id'), 'the objects in the array should have an id key')
        t.true(commands[0].hasOwnProperty('name'), 'the objects in the array should have an name key')
        t.true(commands[0].hasOwnProperty('trigger'), 'the objects in the array should have an trigger key')
        t.true(commands[0].hasOwnProperty('response'), 'the objects in the array should have an response key')
        t.true(commands[0].hasOwnProperty('frequency'), 'the objects in the array should have an frequency key')
        t.true(commands[0].hasOwnProperty('command_id'), 'the objects in the array should have an frequency key')
        t.end()
      }
    })
})

test ('/api/v1/commands/ api post route test', t => {

  request(app)
    .post('/api/v1/commands/')
    .send({
        name: 'testcommand',
        response: 'test response for a test command!',
        trigger: false
      })
    .expect(302)
    .end((err, res) => {
      if(err) console.log(err)
      else {
        console.log(res);
        t.end()
      }
    })
})
