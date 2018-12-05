const fs = require('fs');

const FILE_PATH = './src/history.json'

let history = load() || {};

function load() {
  try {
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch(err) {
    throw err;
  }
}

function write(data) {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 4), 'utf8');
  } catch(err) {
    throw err;
  }
}

function list() {
  return Object.keys(history);
}

function add(name) {
  !history[name] && (history[name] = { finished: false });
  write(history);
}

function verify(name) {
  history[name] && (history[name] = { finished: true });
  write(history);
}

function isFinished(name) {
  return history[name] && history[name].finished;
}

module.exports = {
  add,
  verify,
  list,
  isFinished
};