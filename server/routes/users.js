var express = require('express');
var db = require('../data/db')
var router = express.Router();

router.get('/', (req, res) => {
  var userIds = []
  db.getMostActiveUserIds()
    .then(usersInfo => res.send(usersInfo))
    .catch(err => console.log(err))
})

router.get('/obnoxious', (req, res) => {
  db.getMostObnoxiousUsers()
    .then(usersInfo => res.send(usersInfo))
    .catch(err => console.log(err))
})

module.exports = router
