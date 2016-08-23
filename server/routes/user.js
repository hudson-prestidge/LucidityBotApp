var express = require('express');
var db = require('../data/db')
var router = express.Router();

router.get('/:userId', function(req, res) {
  db.getUserMessageCount(req.params.userId)
      .then(function(userInfo){
        res.send(userInfo)
      })
})

router.get('/obnoxious', function(req, res) {

})

//users who bug the streamer most!

module.exports = router
