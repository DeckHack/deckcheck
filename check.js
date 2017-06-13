const fs = require('fs')
const Ora = require('ora')
const chalk = require('chalk')
const textdiff = require('diff')
const diff = require('deep-diff').diff

const printNew = function (diff) {
  let path = diff.path.join('.')
  console.log(chalk.green(`New value at '${path}'`))
  console.log('Value: ' + diff.rhs + '\n')
}

const printDeleted = function (diff) {
  let path = diff.path.join('.')
  console.log(chalk.red(`Value at '${path}' was deleted`))
  console.log('Value: ' + diff.lhs + '\n')
}

const printEdited = function (diff) {
  let path = diff.path.join('.')
  let chardiff = textdiff.diffChars(diff.lhs, diff.rhs)
  let diffstring = ''

  chardiff.forEach(function (char) {
    let color = char.added ? 'green' : char.removed ? 'red' : 'grey'

    diffstring += chalk[color](char.value)
  })

  console.log(chalk.cyan(`Value at '${path}' was edited`))
  console.log('Difference: ' + diffstring + '\n')
}
// TODO: Either do all of the above cleaner or put it into extra module

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
      spinner.warn('Changes found!\n')

      dataDiff.forEach(function (diff) {
        switch(diff.kind) {
          case 'N':
            printNew(diff)
            break
          case 'D':
            printDeleted(diff)
            break
          case 'E':
            printEdited(diff)
            break
        }
      })

      // TODO: Save new data to file after comparing
    }
  } else {
    writeFile(data)
  }
}
