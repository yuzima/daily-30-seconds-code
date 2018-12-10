const { spawn } = require('child_process');
let exercise = require('workshopper-exercise')();
const filecheck = require('workshopper-exercise/filecheck');
const execute = require('workshopper-exercise/execute');

// checks that the submission file actually exists
exercise = filecheck(exercise);

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise);

exercise.addVerifyProcessor(function(callback) {
  const jest = spawn('jest', ['./test/${exercise}.test.js']);

  jest.stdout.on('data', data => {
    if (data.startsWith('PASS')) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  });
});

module.exports = exercise;
