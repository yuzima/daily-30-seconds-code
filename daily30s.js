const daily30s = require('workshopper-adventure')({
  name: 'daily30s',
  appDir: __dirname,
  // header: require('workshopper-adventure/default/header'),
  footer: require('workshopper-adventure/default/footer'),
  fail: require('workshopper-adventure/default/fail'),
  pass: require('workshopper-adventure/default/pass')
});

const history = require('./src/history');
daily30s.addAll(history.list());

function run(arguments) {
  if (arguments[0] === 'new') {
    require('./src/new').random.apply(daily30s);
  } else if (arguments[0] === 'print') {
    const ex = daily30s.appStorage.get('current');
    daily30s.execute([...arguments, ex]);
  } else if (arguments[0] === 'run') {
    daily30s.execute(arguments);
  } else if (arguments[0] === 'verify') {
    const ex = daily30s.appStorage.get('current');
    require('./src/verify').generateTestFile.apply(daily30s, ex, arguments[1]);
    daily30s.execute(arguments);
  }
}

exports.run = run;
