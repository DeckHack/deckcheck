const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const Ora = require('ora')
const config = require('../config.json')

module.exports = {
  checkData: function() {
    var spinner = new Ora('Checking if data already exists').start()
    if (fs.existsSync(path.resolve(config.data_path, 'data.json'))) {
      spinner.succeed('Data exists, proceeding to comparison')
      return true
    }
    
    spinner.warn('No data exists, writing initial data')
    return false
  },
  
  writeData: function(data) {
    fs.writeFile(path.resolve(config.data_path, 'data.json'), JSON.stringify(data), function(err) {
      if (err) { return console.log(err) }
  
      console.log('Initial data saved. Run again at later point to compare.')
    }); 
  },
  
  readData: function() {
    return JSON.parse(fs.readFileSync(path.resolve(config.data_path, 'data.json'), 'utf8'))
  },

  readTemplate: function() {
    return fs.readFileSync(`${__dirname}/../template.handlebars`, 'utf8')
  },

  writeOutput: function(data) {
    var spinner = new Ora('Writing HTML output').start()
    var timestamp = this.getUnixTimestamp()

    fse.outputFile(path.resolve(config.output_path, `${timestamp}.html`), data, 'UTF-8', function(err) {
      if (err) { 
        return spinner.fail('Something went wrong: ' + err)
      }
  
      spinner.succeed('HTML generated')
    })

    return timestamp
  },

  writeAssets: function(timestamp, data) {
    var spinner = new Ora('Writing Asset output').start()
    var assetData = {timestamp: timestamp, assets: []}

    Object.keys(data.assets).forEach(function (asset) {
      if (!asset.includes('emoji')) {
        assetData.assets.push(data.assets[asset])        
      }
    })

    fs.writeFile(path.resolve(config.assets.path, 'assets.json'), JSON.stringify(assetData), function(err) {
      if (err) { 
        return spinner.fail('Something went wrong: ' + err)
      }

      spinner.succeed('Asset file generated')
    }); 
  },

  getUnixTimestamp: function () {
    return Math.floor(new Date() / 1000)
  }
}