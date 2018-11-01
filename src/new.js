const path = require('path');
const fs = require('fs');
const markdown = require('markdown-builder');
const { headers } = markdown;

const random = function() {
  const snippetDir = path.dirname(require.resolve('30-seconds-of-code/snippets/all.md'));

  // load all md files
  const exercises = fs
    .readdirSync(snippetDir)
    .map(file => file.match(/^(\w+)\.md$/)[1]);

  const exercise = exercises[Math.floor(Math.random() * exercises.length)];
  loadSnippetFile.apply(this, [snippetDir, exercise]);
}

const loadSnippetFile = function (snippetDir, exercise) {
  const destDir = `./exercises/${exercise}`;
  mkdir(`./exercises/${exercise}`);

  fs.readFile(`${snippetDir}/${exercise}.md`, 'utf8', (err, data) => {
    const snippet = data.split('\n\n');

    let output = headers.h1(snippet[0].slice(data.indexOf('###') + 4)) + snippet[1] + headers.h2('Examples') + snippet[4];
    fs.writeFileSync(`${destDir}/problem.md`, output);

    fs.copyFileSync('./src/exercise.js', `${destDir}/exercise.js`);
    this.add(exercise);
    this.execute(['select', exercise]);
  });
};

const mkdir = dir => {
  if (fs.existsSync(dir)) {
    return
  }
  try {
    fs.mkdirSync(dir)
  } catch (err) {
    if (err.code == 'ENOENT') {
      mkdir(path.dirname(dir)); //create parent dir
      mkdir(dir); //create dir
    }
  }
}

exports.random = random;