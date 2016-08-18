var config = require('../knexfile').development
var knex = require('knex')(config)

function getMostActiveUserIds() {
      return knex.select('user_id')
            .count('*')
            .from('messages')
            .groupBy('user_id')
            .orderBy('count', 'desc')
            .limit(5)
}

function getUsersById(ids){
  return knex('users')
        .whereIn('id', ids)
}

module.exports = {
  getMostActiveUserIds: getMostActiveUserIds,
  getUsersById: getUsersById

}
