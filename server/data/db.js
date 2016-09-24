var config = require('../../knexfile').development
var knex = require('knex')(config)
var _ = require('underscore')
var commonWords = require('./commonwords')

function getCommands() {
  return knex('commands')
}

function addCommand(name, response) {
  return knex('commands')
    .insert({
      name: name,
      response: response,
      trigger: false
    })
}

function addTrigger() {
  return knex('commands')
    .insert({
      name: '',
      response: '',
      trigger: true
    })
}

function deleteCommand(commandId) {
  return knex('commands')
    .where('id', commandId)
    .del()
}

function updateCommand(commandId, name, response) {
  return knex('commands')
    .where('id', commandId)
    .update({
      name: name,
      response: response
    })
}


// needs to exclude twitch emotes and commonly used words

function getMostUsedWords() {
  return knex.select('text')
    .from('messages')
    .then(function(data){
      return _.chain(data)
        //have all messages
        //turn into one giant string by concatenating all the strings
        //turn into each individual word by splitting on spaces
        .reduce(function(m, r){return m.concat(r.text.split(' '))}, [])
        //have all words
        //count the instances of each word, turn into object with
        //key value pairs of 'word: number of times word was said'
        .countBy(function(e){return e.toLowerCase()})
        //turn that object into an array with ['word', number of times word was said]
        .pairs()
        //filter out any words in the commonly used words list
        .filter(function(w){return commonWords.indexOf(w[0]) == -1})
        //sort by MOST commonly used word
        .sortBy(function(a){return -a[1]})
        //select the top 10
        .first(10)
        //get out of the underscore chain function and return the values we want
        .value()
    })
}

function getMostObnoxiousUsers(){
  return knex.select('user_id', 'name')
    .count('*')
    .from('messages')
    .join('users', 'messages.user_id', 'users.id')
    .where('text'.toLowerCase(), 'like', '%lara%')
    .orWhere('text'.toLowerCase(), 'like', '%unexpectedbanana%')
    .groupBy('user_id', 'name')
    .orderBy('count', 'desc')
    .limit(10)
}

function getMostActiveUserIds() {
  return knex.select('user_id', 'name')
    .count('*')
    .from('messages')
    .join('users', 'messages.user_id', 'users.id')
    .groupBy('user_id', 'name')
    .orderBy('count', 'desc')
    .limit(10)
}

function getUserMessageCount(userId) {
  return knex.select('user_id')
    .count('*')
    .from('messages')
    .where('user_id', userId)
    .groupBy('user_id')
}

function getUserInfo(user){
  var userInfo = {
    messageCount: getUserMessageCount(user)
  }
}

function getUserById(id){
  return knex('users')
    .where('id', id)
}

module.exports = {
  getMostActiveUserIds: getMostActiveUserIds,
  getUserById: getUserById,
  getMostUsedWords: getMostUsedWords,
  getMostObnoxiousUsers: getMostObnoxiousUsers,
  getUserMessageCount: getUserMessageCount,
  getCommands: getCommands,
  addCommand: addCommand,
  addTrigger: addTrigger,
  deleteCommand: deleteCommand,
  updateCommand: updateCommand
}
