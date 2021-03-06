const path = require('path');
const fs = require('fs');
const markdown = require('markdown-builder');
const history = require('./history');
const { mkdir } = require('./utils');
const { headers } = markdown;

function random() {
  // get the directory of snippets
  const dir = path.resolve(
    require.resolve('30-seconds-of-code'),
    '../../snippets'
  );

  // load all markdown files
  const exs = fs.readdirSync(dir).map(file => file.match(/^(\w+)\.md$/)[1]);

  let ex = null;
  // check if the exercise has been finished
  do {
    ex = exs[Math.floor(Math.random() * exs.length)];
  } while(history.isFinished(ex));

  loadSnippetFile.apply(this, [dir, ex]);

  // record this exercise to history.json
  history.add(ex);
};

function loadSnippetFile(srcDir, ex) {
  const destDir = `./exercises/${ex}`;
  mkdir(destDir);

  fs.readFile(`${srcDir}/${ex}.md`, 'utf8', (err, data) => {
    const snippet = data.split('\n\n');

    // generate problem file
    let output =
      headers.h1(snippet[0].slice(data.indexOf('###') + 4)) +
      snippet[1] +
      headers.h2('Examples') +
      snippet[4];
    fs.writeFileSync(`${destDir}/problem.md`, output);

    // generate exercise.js
    fs.readFile('./src/exercise.js', 'utf8', (err, data) => {
      fs.writeFile(`${destDir}/exercise.js`, data.replace(/\${exercise}/, ex));
    });
    // fs.copyFileSync('./src/exercise.js', `${destDir}/exercise.js`);

    // generate solution file
    generateSolution(destDir, snippet, ex);

    select.apply(this, [ex]);
  });
};

function generateSolution(destDir, snippet, ex) {
  // const test = snippet[4].slice(6, snippet[4].length - 5).split('\n\n');
  let output = `/*\n${snippet[1]}\n*/\n\n`;
  output += snippet[3].slice(6, snippet[3].length - 5) + '\n\n';
  // output += test.reduce((accumulator, current) => {
  //   const hasReturn = current.match(/(.+);\s\/\/\s.+$/);
  //   return accumulator + (hasReturn ? `console.log(${hasReturn[1]});\n` : `${current}\n`);
  // }, '');
  output += `module.exports = ${ex};`;
  mkdir(`${destDir}/solution`);
  fs.writeFileSync(`${destDir}/solution/solution.js`, output);
}

function select(ex) {
  // add exercise to workshopper
  this.add(ex);

  // simulate the selection the exercise
  this.execute(['select', ex]);
}

module.exports = {
  random
};