var express = require('express')
var users = require('./routes/users')
var words = require('./routes/words')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var cookieParser = require('cookie-parser')
var session = require('express-session')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var flash = require('connect-flash')
var bcrypt = require('bcrypt-nodejs')

var app = express()

// passport.use('signup', new LocalStrategy(
//   function(name, password, done) {
//     if (name != '' && password != '') {
//       knex('users').where('name', name).then(function(users){
//         if(users.length > 0) {
//           return done(null, false, { message: 'Username is already taken.' })
//         } else {
//           knex('users').returning('id').insert({
//             name: name,
//             password: bcrypt.hashSync(password)
//           }).then(function(newIds){
//             knex('users').where('id', newIds[0]).first().then(function(user){
//               return done(null, user)
//             })
//           })
//         }
//       })
//     } else {
//       return done(null, false, { message: 'Username and password must be provided details.' })
//     }
//   }
// ))

app.use(express.static('public'))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ cookie: { maxAge: 60000 }, secret: 'bodyparseristheworstthing', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(bodyParser.json())

app.use('/api/v1/users/', users)
app.use('/api/v1/commands/', commands)
app.use('/api/v1/words/', words)
//
// app.get('/login', function(req, res) {
//   res.render('login')
// })
//
// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })


app.use('/api/v1/users', users)
app.use('/api/v1/words', words)

module.exports = app
