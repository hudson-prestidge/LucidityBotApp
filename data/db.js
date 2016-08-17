var config = require('../knexfile').development
var knex = require('knex')(config)

function getMostActiveUser() {
  return knex('messages')
        .innerJoin('users', 'messages.user_id', 'users.id')
        .then(function(data) {
          var maxMessagesSent = 0
              // data is in this form
              // [
              // anonymous { id: 14, user_id: 14, text: 'Hodor', name: 'vincentjatkoo' },
              // anonymous { id: 15, user_id: 15, text: 'Kappa', name: 'domagal_' },
              // anonymous { id: 16, user_id: 16, text: 'wisps noooo', name: 'teh4rch3r' },
              // anonymous { id: 17, user_id: 17, text: 'OWL', name: 'bennyhilll' },
              // anonymous { id: 18, user_id: 18, text: 'Kappa', name: 'r3d3mpt0r' },
              // anonymous { id: 19, user_id: 19, text: '@jupi', name: 'francyzzz14' },
              // anonymous {
              //   id: 20,
              //   user_id: 20,
              //   text: 'Show him your moves',
              //   name: 'harbhub' } ]

              // need to go through that data and find the most commonly occuring user_id, then return their name

              var senderArray = data.map((user) => user.name)

              // now you have an array of just names, so using the previous example
              // [
              // 'vincentjatkoo',
              // 'domagal_',
              // 'teh4rch3r',
              // 'bennyhilll',
              // 'r3d3mpt0r',
              // 'francyzzz14',
              // 'harbhub']

              var messageFrequency = {}

              senderArray.map(function(sender){
                if(messageFrequency[sender]){
                  messageFrequency[sender] += 1
                } else {
                  messageFrequency[sender] = 1
                }
              })

              // now you have an objet with keys of a particular username and
              // values incremented by one for each message associated with that user

              var mostMessagesSent = 0
              var mostAciveUser = ''

              Object.keys(messageFrequency).map(function(key){
                if(messageFrequency[key] > mostMessagesSent){
                  mostMessagesSent = messageFrequency[key]
                  mostActiveUser = key
                }
              })

              console.log(mostActiveUser + " is the most active user I've seen and has sent " + mostMessagesSent + " messages!")

        })
}

module.exports = {
  getMostActiveUser: getMostActiveUser

}
