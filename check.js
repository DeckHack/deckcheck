const fs = require('fs')
const Ora = require('ora')
const diff = require('deep-diff').diff

const checkFile = function() {
  var spinner = new Ora('Checking if data already exists').start()
  if (fs.existsSync('./data.json')) {
    spinner.succeed('Data exists, proceeding to comparing')
    return true
  }
  
  spinner.warn('No data exists, writing initial data')
  return false
}

const writeFile = function(data) {
  fs.writeFile('./data.json', JSON.stringify(data), function(err) {
    if (err) { return console.log(err) }

    console.log('Initial data saved. Run again at later point to compare.')
  }); 
}

const readFile = function() {
  return JSON.parse(fs.readFileSync('./data.json', 'utf8'))
}

module.exports = function (data) {
  if (checkFile()) {
    var spinner = new Ora('Reading old data').start()
    const oldData = readFile()
    spinner.text = 'Comparing old and new data'
    const dataDiff = diff(oldData, data)

    if (dataDiff === undefined) {
      spinner.succeed('Nothing has changed')
    } else {
      spinner.warn('Changes found!')
      console.log(dataDiff)
    }
  } else {
    writeFile(data)
  }
}
