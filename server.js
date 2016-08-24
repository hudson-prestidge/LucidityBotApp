var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var port = process.env.PORT || 3000
var users = require('./server/routes/users')
var commands = require('./server/routes/commands')

var app = express()
var server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1/users/', users)
app.use('/api/v1/commands/', commands)

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

if (require.main === module) {
  server.listen(port, function () {
    console.log('http server listening on port: ', port)
  })
}
