const request = require('request')
const config = require('../config.json')

let sendEmbedMessage = function(title, message, url) {
  request.post(
    config.discord.url, {
      json: {
        username: config.discord.username,
        avatar_url: config.discord.avatar_url,
        embeds: [
          {
            title: title,
            url: url,
            description: message
          }
        ]
      }
    },
    function (error, response, body) {
      if (error) { console.log(error) }
    }
  )
}

module.exports = {
  initialDataMessage: function () {
    sendEmbedMessage("Initial data saved", 
      "DeckCheck was run for the first time in this environment. If there are changes the next time it's run, it will generate a report!", 
      "https://github.com/DeckHack/deckcheck"
    )
  },
  changedDataMessage: function () {
    sendEmbedMessage("Changes found",
      "Looks like something changed with a recent update. Click the link at the top of this message to check out a detailed report",
      "https://github.com/DeckHack/deckcheck"
    )
  }
}