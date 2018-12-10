const fs = require('fs');
const path = require('path');

function mkdir(dir) {
  if (fs.existsSync(dir)) {
    return;
  }
  try {
    fs.mkdirSync(dir);
  } catch (err) {
    if (err.code == 'ENOENT') {
      mkdir(path.dirname(dir)); //create parent dir
      mkdir(dir); //create dir
    }
  }
}

module.exports = {
  mkdir
};