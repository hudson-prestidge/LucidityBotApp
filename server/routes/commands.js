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
  db.addCommand(/*insert thing here*/)
})

module.exports = router
