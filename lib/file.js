const fs = require('fs')
const Ora = require('ora')

module.exports = {
  checkData: function() {
    var spinner = new Ora('Checking if data already exists').start()
    if (fs.existsSync('./data.json')) {
      spinner.succeed('Data exists, proceeding to comparing')
      return true
    }
    
    spinner.warn('No data exists, writing initial data')
    return false
  },
  
  writeData: function(data) {
    fs.writeFile('./data.json', JSON.stringify(data), function(err) {
      if (err) { return console.log(err) }
  
      console.log('Initial data saved. Run again at later point to compare.')
    }); 
  },
  
  readData: function() {
    return JSON.parse(fs.readFileSync('./data.json', 'utf8'))
  },

  readTemplate: function() {
    return fs.readFileSync('./template.handlebars', 'utf8')
  },

  writeOutput: function(data) {
    var spinner = new Ora('Writing HTML output').start()

    fs.writeFile(`./${this.getUnixTimestamp()}.html`, data, 'UTF-8', function(err) {
      if (err) { 
        return spinner.fail('Something went wrong: ' + err)
      }
  
      spinner.succeed('HTML generated')
    }) 
  },

  getUnixTimestamp: function () {
    return Math.floor(new Date() / 1000)
  }
}