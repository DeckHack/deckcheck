const textdiff = require('diff')
const handlebars = require('handlebars')

handlebars.registerHelper('fullPath', function(path) {
  return path.join('.')
});

handlebars.registerHelper('compare', function(lvalue, rvalue, options) {
  
    if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

    var operator = options.hash.operator || "==";

    var operators = {
        '==':       function(l,r) { return l == r; },
        '===':      function(l,r) { return l === r; },
        '!=':       function(l,r) { return l != r; },
        '<':        function(l,r) { return l < r; },
        '>':        function(l,r) { return l > r; },
        '<=':       function(l,r) { return l <= r; },
        '>=':       function(l,r) { return l >= r; },
        'typeof':   function(l,r) { return typeof l == r; }
    }

    if (!operators[operator])
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

    var result = operators[operator](lvalue,rvalue);

    if( result ) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

})

handlebars.registerHelper('editDiff', function(lvalue, rvalue) {
  let chardiff = textdiff.diffWordsWithSpace(lvalue, rvalue)
  let diffstring = ''

  chardiff.forEach(function (char) {
    let color = char.added ? 'green' : char.removed ? 'red' : 'black'

    diffstring += `<span style="color: ${color};">${handlebars.Utils.escapeExpression(char.value)}<span>`
  })

  return diffstring
})

module.exports = handlebars