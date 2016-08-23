var express = require('express');
var db = require('../data/db')
var router = express.Router();

router.get('/', function(req, res) {
  db.getMostUsedWord()
    .then(function(words){
      res.send("the most used word is " + words)
    })
})

module.exports = router
