var express = require('express');
var db = require('../data/db')
var bodyParser = require('body-parser')
var router = express.Router();

var jsonParser = bodyParser.urlencoded({ extended: false })

router.get('/', function(req, res){
  db.getAllCommands()
  .then(function(commands) {
      res.send(commands)
  })
  .catch(function(err){
    console.log(err)
  })
})

router.get('/regularCommands', function(req, res) {
  db.getRegularCommands()
    .then(function(commands) {
        res.send(commands)
    })
    .catch(function(err){
      console.log(err)
    })
})

router.get('/triggerPhrases', function(req, res) {
  db.getTriggerPhrases()
    .then(function(commands) {
        res.send(commands)
    })
    .catch(function(err){
      console.log(err)
    })
})

router.get('/scheduledCommands', function(req, res) {
  db.getScheduledCommands()
    .then(function(commands) {
        res.send(commands)
    })
    .catch(function(err){
      console.log(err)
    })
})

router.post('/scheduledCommands/new/:id', function(req, res) {
  db.addScheduledCommand(req.params.id)
    .then(function(data){
      res.sendStatus(200)
    })
})

router.post('/scheduledCommands/:id/', jsonParser, function(req, res) {
  db.updateScheduledCommand(req.params.id, req.body.frequency)
    .then(function(data){
    })
})

router.delete('/scheduledCommands/:id/', function(req, res) {
  db.deleteScheduledCommand(req.params.id)
    .then(function(data){
      res.sendStatus(200)
    })
})

router.post('/', jsonParser, function(req, res) {
  db.addCommand(req.body.name, req.body.response)
    .then(function(data){
    })
})

router.put('/:id', function(req, res) {
  db.updateCommand(req.params.id, req.body.name, req.body.response)
    .then(function(data){
    })
})

router.delete('/:id', function(req, res) {
  db.deleteCommand(req.params.id)
    .then(function(data){
      res.sendStatus(200)
    })
})

module.exports = router
