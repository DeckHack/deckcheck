const Ora = require('ora')
const chalk = require('chalk')
const textdiff = require('diff')
const diff = require('deep-diff').diff
const config = require('../config.json')

const handlebars = require('./handlebars')
const fileUtils = require('./file')
const discord = require('./discord')

module.exports = function (data) {
  if (fileUtils.checkData()) {
    var spinner = new Ora('Reading old data').start()

    // reading old data
    const oldData = fileUtils.readData()

    spinner.text = 'Comparing old and new data'

    // diffing old and new data
    const dataDiff = diff(oldData, data)

    // loading template from file and compiling it into a handlebars template
    // filling it with result variables
    const template = handlebars.compile(fileUtils.readTemplate())
    const result = template({diffs: dataDiff})

    if (dataDiff === undefined) {
      // nothing has changed
      spinner.succeed('Nothing has changed')
    } else {
      spinner.warn('Changes found!')

      // writing HTML output and returning the timestamp
      const timestamp = fileUtils.writeOutput(result)

      if (config.discord.enabled) {
        // sends a message to the Discord webhook, the timestamp is required for the filepath
        discord.changedDataMessage(timestamp)
      }

      // save new data to file
      fileUtils.writeData(data)
    }
  } else {
    // initial data, saved to file
    fileUtils.writeData(data)

    if (config.discord.enabled) {
      // initial data message
      discord.initialDataMessage()
    }
  }
}