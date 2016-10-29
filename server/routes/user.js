var express = require('express');
var db = require('../data/db')
var router = express.Router();

router.get('/:userId', (req, res) => {
  db.getUserMessageCount(req.params.userId)
      .then(userInfo => res.send(userInfo))
})

router.get('/obnoxious', (req, res) => {

})

module.exports = router
