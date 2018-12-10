const fs = require('fs');
const { mkdir } = require('./utils');

function generateTestFile(ex, file) {
  const code = fs.readFileSync(file);
  const test = fs.readFileSync(`./test/${ex}.test.js`);
  mkdir('./tmp');
  fs.writeFileSync(`./tmp/${ex}.test.js`, code + '\n\n' + test);
}

module.exports = {
  generateTestFile
};
