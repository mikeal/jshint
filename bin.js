#!/usr/bin/env node

var jshint = require('./main')
  , fs = require('fs')
  , args = Array.prototype.slice.call(process.argv)
  , nodebin = args.shift()
  , bin = args.shift()
  ;

if (!args.length || args[0] === '-h' || args[0] === 'help' || args[0] === '--help') {
  
  console.log('jshint -- JavaScript linting without the Crockford');
  console.log('usage: jshint -opt1 -opt2 filename.js');
  console.log('');
  var keys = Object.keys(jshint.boolOptions);
  console.log('options: '+keys.slice(0, 5).join(','));
  keys = keys.slice(5);
  
  while (keys.length) {
    console.log('         '+keys.slice(0, 5).join(','));
    keys = keys.slice(5);
  }
} else {
  var filename = args.pop()
    , options = {}
    ;
  args.forEach(function (a) {
    while (a.indexOf('-') !== -1) a = a.replace('-', '');
    options[a] = true;
  });
  var result = jshint(fs.readFileSync(filename).toString(), options);
  if (!result) {
    console.error(jshint.errors);
    process.exit(1);
  } else {
    console.log("All checks passed.");
  }
  
}