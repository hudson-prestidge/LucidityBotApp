var config = require('../../knexfile').development
var knex = require('knex')(config)
var _ = require('underscore')
var commonWords = require('./commonwords')

function getRegularCommands() {
  return knex('commands')
        .where('trigger', false)
}

function getTriggerPhrases() {
  return knex('commands')
        .where('trigger', true)
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

function getMostUsedWords() {
  return knex.select('text')
    .from('messages')
    .then(function(data){
      return _.chain(data)
        .reduce(function(m, r){return m.concat(r.text.split(' '))}, [])
        .countBy(function(e){return e.toLowerCase()})
        .pairs()
        .filter(function(w){return commonWords.indexOf(w[0]) == -1})
        .sortBy(function(a){return -a[1]})
        .first(10)
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
  getRegularCommands: getRegularCommands,
  getTriggerPhrases: getTriggerPhrases,
  addCommand: addCommand,
  addTrigger: addTrigger,
  deleteCommand: deleteCommand,
  updateCommand: updateCommand
}
