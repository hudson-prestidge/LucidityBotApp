var express = require('express');
var db = require('../data/db')
var bodyParser = require('body-parser')
var router = express.Router();

var jsonParser = bodyParser.urlencoded({ extended: false })

router.get('/',(req, res) => {
  db.getAllCommands()
  .then(commands => res.send(commands))
  .catch(err => console.log(err))
})

router.get('/regularCommands', (req, res) => {
  db.getRegularCommands()
    .then(commands => res.send(commands))
    .catch(err => console.log(err))
})

router.get('/triggerPhrases',(req, res) => {
  db.getTriggerPhrases()
    .then(commands => res.send(commands))
    .catch(err => console.log(err))
})

router.get('/scheduledCommands',(req, res) => {
  db.getScheduledCommands()
    .then(commands => res.send(commands))
    .catch(err => console.log(err))
})

router.post('/scheduledCommands/new/:id', (req, res) => {
  db.addScheduledCommand(req.params.id)
    .then(() => res.sendStatus(200))
})

router.post('/scheduledCommands/:id/', jsonParser, (req, res) => {
  db.updateScheduledCommand(req.params.id, req.body.frequency)
    .then(() => { })
})

router.delete('/scheduledCommands/:id/',(req, res) => {
  db.deleteScheduledCommand(req.params.id)
    .then(() => res.sendStatus(200))
})

router.post('/', jsonParser, (req, res) => {
  var newCommand = {}
  newCommand.name = req.body.name
  newCommand.response = req.body.response
  newCommand.trigger = req.body.trigger

  db.addCommand(newCommand)
    .then(() => res.redirect('back'))
})

router.post('/:id', jsonParser, (req, res) => {
  db.updateCommand(req.params.id, req.body.name, req.body.response)
    .then(() => res.redirect('back'))
})

router.delete('/:id', (req, res) => {
  db.deleteCommand(req.params.id)
    .then(() => res.sendStatus(200))
})

module.exports = router
