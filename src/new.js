const path = require('path');
const fs = require('fs');
const markdown = require('markdown-builder');
const { headers } = markdown;

const random = () => {
  const pathToModule = path.dirname(
    require.resolve('30-seconds-of-code/snippets/all.md')
  );

  // load all md files
  const exercises = fs
    .readdirSync(pathToModule)
    .map(file => file.match(/^(\w+)\.md$/)[1]);

  const question = exercises[Math.floor(Math.random() * exercises.length)];

  fs.readFile(`${pathToModule}/${question}.md`, 'utf8', (err, data) => {
    const snippet = data.split('\n\n');
    let output = headers.h1(snippet[0].slice(data.indexOf('###') + 4))
      + snippet[1]
      + headers.h2('Test Example')
      + snippet[4];
  });
}

exports.random = random;