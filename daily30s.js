const daily30s = require('workshopper-adventure')({
  name: 'daily30s',
  appDir: __dirname,
  header: require('workshopper-adventure/default/header'),
  footer: require('workshopper-adventure/default/footer'),
  fail: require('workshopper-adventure/default/fail'),
  pass: require('workshopper-adventure/default/pass')
});

function run(arguments) {
  if (arguments[0] === 'new') {
    require('./src/new').random.apply(daily30s);
  }
}

exports.run = run;
