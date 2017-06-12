const fs = require('fs')
const diff = require('deep-diff').diff;

const checkFile = function() {
  if (fs.existsSync('./data.json')) {
    return true
  }
  
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
    const oldData = readFile()
    const dataDiff = diff(oldData, data)

    if (dataDiff === undefined) {
      console.log('Nothing has changed')
    } else {
      // TODO: do something with the deep-diff output
      console.log(dataDiff)
    }
  } else {
    writeFile(data)
  }
}