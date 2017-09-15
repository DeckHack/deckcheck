const Nightmare = require('nightmare')
const Ora = require('ora')
const nightmare = Nightmare()
const check = require('./lib/check.js')

const spinner = new Ora('Opening TweetDeck and fetching data').start()

nightmare
  .goto('https://tweetdeck.twitter.com')
  .evaluate(function () {
    return {
      version: window.TD.version,
      buildID: window.TD.buildID,
      assets: window.TD.assetsOverlay,
      config: window.TD.config,
      // decider: window.TD.decider.getAllWithOverlay(), // this sometimes works and sometimes doesn't
      templates: window.TD.mustaches
    }
  })
  .end()
  .then(function (result) {
    spinner.succeed('Acquired data from TweetDeck')
    check(result)
  })
  .catch(function (error) {
    spinner.fail('Something went wrong: ' + error)
  })