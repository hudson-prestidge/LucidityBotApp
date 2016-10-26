var express = require('express');
var db = require('../data/db')
var router = express.Router();

router.get('/', (req, res) => db.getMostUsedWords().then(words => res.send(words)) )

module.exports = router
