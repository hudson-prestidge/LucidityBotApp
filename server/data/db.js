var config = require('../../knexfile').development
var knex = require('knex')(config)
var _ = require('underscore')

// getMostUsedWords().then(function(arr){console.log(arr);})

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

function getMostUsedWords() {
  return knex.select('text')
    .from('messages')
    .then(function(data){
      return _.chain(data)
        .reduce(function(m, r){return m.concat(r.text.split(' '))}, [])
        .countBy(function(e){return e.toLowerCase()})
        .pairs()
        .sortBy(function(a){return -a[1]})
        .first(5)
        .value()
    })
}

function getMostAnnoyingUsers(){
  return knex.select('user_id', 'name')
    .count('*')
    .from('messages')
    .join('users', 'messages.user_id', 'users.id')
    .where('text'.toLowerCase(), 'like', '%loserfruit%')
    .orWhere('text'.toLowerCase(), 'like', '%kath%')
    .groupBy('user_id', 'name')
    .orderBy('count', 'desc')
    .limit(5)
}

function getMostActiveUserIds() {
  return knex.select('user_id', 'name')
    .count('*')
    .from('messages')
    .join('users', 'messages.user_id', 'users.id')
    .groupBy('user_id', 'name')
    .orderBy('count', 'desc')
    .limit(5)
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
  getMostAnnoyingUsers: getMostAnnoyingUsers,
  getUserMessageCount: getUserMessageCount,
  getCommands: getCommands,
  addCommand: addCommand,
  addTrigger: addTrigger,
  deleteCommand: deleteCommand,
  updateCommand: updateCommand
}
