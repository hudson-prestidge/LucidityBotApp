var express = require('express');
var db = require('../data/db')
var router = express.Router();

router.get('/', function(req, res) {
  var userIds = []
  db.getMostActiveUserIds()
    .then(function(usersInfo) {
        res.send(usersInfo)
    })
    .catch(function(err){
      console.log(err)
    })
})

router.get('/obnoxious', function(req, res) {
  db.getMostObnoxiousUsers()
    .then(function(usersInfo) {
        res.send(usersInfo)
    })
    .catch(function(err){
      console.log(err)
    })
})

module.exports = router
