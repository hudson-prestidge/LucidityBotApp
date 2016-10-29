var config = require('../../knexfile').development
var knex = require('knex')(config)
var _ = require('underscore')
var commonWords = require('./commonwords')

var RIOT_GAMES_API_KEY = process.env.RIOT_GAMES_API_KEY

var getAllCommands = () => knex('commands')

var getRegularCommands = () => knex('commands').where('trigger', false)

var getTriggerPhrases = () => knex('commands').where('trigger', true)

var getScheduledCommands = () => knex('commands').innerJoin('scheduled_commands', 'scheduled_commands.command_id','commands.id')

var updateScheduledCommand = (id, frequency) => knex('scheduled_commands').where('id', id).update('frequency', frequency)

var addCommand = ( obj ) => knex('commands').insert({ name: obj.name, response: obj.response, trigger: obj.trigger})

var addScheduledCommand = id => knex('scheduled_commands').insert({ command_id: id, frequency: 600 })

var deleteCommand = id => knex('commands').where('id', id).del()

var deleteScheduledCommand = id => knex('scheduled_commands').where('id', id).del()

var updateCommand = (id, name, response) => knex('commands').where('id', id).update({ name: name, response: response })

var getMostUsedWords = () => {
  return knex.select('text')
    .from('messages')
    .then(data => {
      return _.chain(data)
        .reduce((m, r) =>  m.concat(r.text.split(' ')), [])
        .countBy(e => e.toLowerCase())
        .pairs()
        .filter(w => commonWords.indexOf(w[0]) == -1)
        .sortBy(a => -a[1])
        .first(10)
        .value()
    })
}

var getMostObnoxiousUsers = () => {
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

var getMostActiveUserIds = () => {
  return knex.select('user_id', 'name')
    .count('*')
    .from('messages')
    .join('users', 'messages.user_id', 'users.id')
    .groupBy('user_id', 'name')
    .orderBy('count', 'desc')
    .limit(10)
}

 var getUserMessageCount = userId => {
  return knex.select('user_id')
    .count('*')
    .from('messages')
    .where('user_id', userId)
    .groupBy('user_id')
}

var getUserInfo = user => {var userInfo = { messageCount: getUserMessageCount(user) }}

var getUserById = id => knex('users').where('id', id)

module.exports = {
  getMostActiveUserIds,
  getUserById,
  getMostUsedWords,
  getMostObnoxiousUsers,
  getUserMessageCount,
  getAllCommands,
  getRegularCommands,
  getTriggerPhrases,
  addCommand,
  deleteCommand,
  updateCommand,
  getScheduledCommands,
  deleteScheduledCommand,
  updateScheduledCommand,
  addScheduledCommand
}
