// import express from 'express'
// import index from 'index.js'
//
// const server = express()
//
// const PORT = 3000
//
// server.listen(PORT, () => {
//   console.log("Server is listening on port", PORT)
// })
//
// index.render()
//
// export default server

var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var port = process.env.PORT || 3000

var app = express()
var server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

if (require.main === module) {
  server.listen(port, function () {
    console.log('http server listening on port: ', port)
  })
}
