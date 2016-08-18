var express = require('express');
var db = require('../data/db')
var router = express.Router();

router.get('/', function(req, res) {
  db.getMostActiveUserIds()
    .then(function(usersInfo) {
      console.log(usersInfo)
      var userIds = [usersInfo[0].user_id,usersInfo[1].user_id,usersInfo[2].user_id,usersInfo[3].user_id,usersInfo[4].user_id]
      db.getUsersById(userIds)
      // getusersbyid currently returns the users sorted by id, which means the order that we established from getMostActiveUserIds
      // is not preserved. Fix this! There are many different ways to approach a solution.
      .then(function(users){
        res.send(users)
      })
    })
    .catch(function(err){
      console.log(err)
    })
})

//users who bug the streamer most!

module.exports = router
