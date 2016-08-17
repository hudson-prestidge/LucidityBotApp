var express = require('express')
var users = require('./routes/users')

var app = express()

var PORT = 3456

app.listen(PORT, function() {
  console.log('the server is running and listening on port ', PORT);
})

app.use(express.static('public'))
app.use('/api/v1/users', users)

module.exports = app
