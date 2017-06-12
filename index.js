const Nightmare = require('nightmare')
const nightmare = Nightmare()
const check = require('./check.js')

nightmare
  .goto('https://tweetdeck.twitter.com')
  .evaluate(function () {
    return {
      version: window.TD.version,
      buildID: window.TD.buildID,
      assets: window.TD.assetsOverlay,
      config: window.TD.config,
      decider: window.TD.decider.getAllWithOverlay(),
      templates: window.TD.mustaches
    }
  })
  .end()
  .then(function (result) {
    check(result)
  })
  .catch(function (error) {
    console.log('Something went wrong: ' + error)
  })
