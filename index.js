const Nightmare = require('nightmare')
const nightmare = Nightmare()

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
    // TODO: actually do something with the data, save it, compare it, all that stuff
    console.log(result)
  })
  .catch(function (error) {
    console.log('Something went wrong: ' + error)
  })
