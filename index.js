const alfy = require('alfy');
const got = require('got');
const input = alfy.input.toLowerCase();
const fileUrl = 'https://github.com/krschultz/android-proguard-snippets/blob/master/';

function filter(tree) {
  return tree
    .filter(x => {
      return x.path.indexOf('libraries') >= 0;
    })
    .filter(x => {
      filename = x.path.replace(/libraries\//, '')
      return filename.endsWith('.pro') &&
        filename.toLowerCase().indexOf(input) >= 0
    })
    .map(x => {
      filename = x.path.replace(/libraries\//, '')
      return {
        title: filename,
        arg: fileUrl + x.path
      }
    })
    .sort();
}

const url = 'https://alfred-workflows-62254.firebaseio.com/pg.json'
alfy.fetch(url)
  .then(items => {
    const output = filter(items);
    alfy.output(output);
  })

