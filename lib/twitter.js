const Twit = require('twit')
const config = require('../config.json')

var T = new Twit({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token: config.twitter.access_token,
  access_token_secret: config.twitter.access_token_secret,
})

module.exports = {
  sendTweet: function (timestamp) {
    T.post('statuses/update', { status: `Looks like something changed with a recent update.\n\nCheck out the link below for a detailed report:\n${config.output_url}${timestamp}.html` }, function(err, data, response) {
      if (err) { console.log(err) }
    })
  }
}