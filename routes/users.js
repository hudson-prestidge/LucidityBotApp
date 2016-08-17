var express = require('express');
var db = require('../data/db')
var router = express.Router();

router.get('/', function(req, res) {
  db.getMostActiveUser()
    .then(function(user) {
      res.send(user)
    })
    .catch(function(err){
      console.log(err)
    })
})

module.exports = router
