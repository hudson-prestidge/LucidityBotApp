var config = require('../knexfile').development
var knex = require('knex')(config)

function getMostUsedWord() {
  return knex.select('text')
            .from('messages')
            .then(function(data){
              // data is in the form of an array with [{text:''},{text:''}]
              var wordArray = data.map(function(obj){
               return obj.text
             }).join(' ').split(' ')
              var wordFrequency = {}

              wordArray.map(function(word) {
                if(wordFrequency[word]){
                  wordFrequency[word] += 1
                } else {
                  wordFrequency[word] = 1
                }
              })

              var mostUsedWord = ''
              var mostWordUses = 0

              Object.keys(wordFrequency).map(function(key){
                if(wordFrequency[key] > mostWordUses){
                  mostUsedWord = key
                  mostWordUses = wordFrequency[key]
                }
              })
              return mostUsedWord
            })
}

function getMostAnnoyingUsers(){
  return knex.select('user_id')
        .count('*')
        .from('messages')
        .where('text', 'like', '%day9tv%')
        .groupBy('user_id')
        .orderBy('count', 'desc')
        .limit(5)
}

function getMostActiveUserIds() {
      return knex.select('user_id')
            .count('*')
            .from('messages')
            .groupBy('user_id')
            .orderBy('count', 'desc')
            .limit(5)
}

function getUserById(id){
  return knex('users')
        .where('id', id)
}



module.exports = {
  getMostActiveUserIds: getMostActiveUserIds,
  getUserById: getUserById,
  getMostUsedWord: getMostUsedWord,
  getMostAnnoyingUsers: getMostAnnoyingUsers

}
