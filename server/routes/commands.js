var express = require('express');
var db = require('../data/db')
var router = express.Router();

router.get('/', function(req, res) {
  db.getCommands()
    .then(function(commands) {
        res.send(commands)
    })
    .catch(function(err){
      console.log(err)
    })
})

router.post('/', function(req, res) {
  db.addCommand(req.body.name, req.body.response)
    .then(function(data){

    })
})

router.post('/:id', function(req, res) {
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
