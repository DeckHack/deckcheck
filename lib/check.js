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
    const oldData = fileUtils.readData()
    spinner.text = 'Comparing old and new data'
    const dataDiff = diff(oldData, data)

    const template = handlebars.compile(fileUtils.readTemplate())
    const result = template({diffs: dataDiff})

    if (dataDiff === undefined) {
      spinner.succeed('Nothing has changed')
    } else {
      spinner.warn('Changes found!')

      fileUtils.writeOutput(result)

      if (config.discord.enabled) {
        discord.changedDataMessage()
      }

      // TODO: Save new data to file after comparing
    }
  } else {
    fileUtils.writeData(data)

    if (config.discord.enabled) {
      discord.initialDataMessage()
    }
  }
}