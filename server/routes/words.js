var express = require('express');
var db = require('../data/db')
var router = express.Router();

router.get('/', function(req, res) {
  db.getMostUsedWords()
    .then(function(words){
      res.send(words)
    })
})

module.exports = router
