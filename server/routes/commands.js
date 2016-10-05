var express = require('express');
var db = require('../data/db')
var bodyParser = require('body-parser')
var router = express.Router();

var jsonParser = bodyParser.urlencoded({ extended: false })

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

// router.get('/scheduledCommands', function(req, res) {
//   db.getCommands()
//     .then(function(commands) {
//         res.send(commands)
//     })
//     .catch(function(err){
//       console.log(err)
//     })
// })

router.post('/', jsonParser, function(req, res) {
  console.log(req.body);
  db.addCommand(req.body.name, req.body.response)
    .then(function(data){
      res.redirect('/commands ')
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
    })
})

module.exports = router
