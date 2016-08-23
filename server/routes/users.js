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
  db.getMostAnnoyingUsers()
    .then(function(usersInfo) {
        res.send(usersInfo)
    })
    .catch(function(err){
      console.log(err)
    })
})

//users who bug the streamer most!

module.exports = router
