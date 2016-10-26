var express = require('express')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var cookieParser = require('cookie-parser')
var session = require('express-session')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var flash = require('connect-flash')
var bcrypt = require('bcrypt-nodejs')
var path = require('path')
var pug = require('pug')

var config = require('../knexfile').development
var knex = require('knex')(config)

var users = require('./routes/users')
var commands = require('./routes/commands')
var words = require('./routes/words')

var app = express()

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'pug');

app.use(express.static('public'))

app.use('/api/v1/users/', users)
app.use('/api/v1/commands/', commands)
app.use('/api/v1/words/', words)

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ cookie: { maxAge: 60000 }, secret: 'bodyparseristheworstthing', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(bodyParser.json())

passport.serializeUser((user, callback) => callback(null, user.id) )

passport.deserializeUser((id, callback) => knex('users').where('id', id).first().then((user) => callback(null, user)) )

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next()

  req.flash('error', 'You must be logged in to access that page.')
  res.redirect('/login')
}

passport.use('login', new LocalStrategy(
  (name, password, done) => {
    knex('users').where('name', name).first().then((user) => {
      if(user) {
        // if(bcrypt.compareSync(password, user.password)) {
        if(password === user.password) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Invalid password.' })
        }
      } else {
        return done(null, false, { message: 'Incorrect details.' })
      }
    })
  }
))

app.get('/login', (req, res) => res.render('login', { messages: req.flash() }) )

app.post('/login',
  passport.authenticate('login', { failureRedirect: '/login', failureFlash: true } ),
  (req, res) => res.redirect('/')
)

app.get('/logout',
  (req, res) => {
    req.logout()
    res.redirect('/login')
  }
)

app.get('/commands/*', isAuthenticated, (req, res) => res.sendFile(path.join(__dirname, '../public', 'app.html')) )

app.get('/users/*', isAuthenticated, (req, res) => res.sendFile(path.join(__dirname, '../public', 'app.html')) )

app.get('/stats/*', isAuthenticated, (req, res) =>  res.sendFile(path.join(__dirname, '../public', 'app.html')) )

app.get('/home/*', isAuthenticated, (req, res) => res.sendFile(path.join(__dirname, '../public', 'app.html')) )

app.get('/', isAuthenticated, (req, res) => res.sendFile(path.join(__dirname, '../public', 'app.html')) )

module.exports = app
