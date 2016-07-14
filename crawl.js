#!/usr/bin/env node

const fs = require('fs');
const got = require('got');
const execSync = require('child_process').execSync;

const treeUrl = 'https://api.github.com/repos/krschultz/android-proguard-snippets/git/trees/master?recursive=1';
const fileUrl = 'https://github.com/krschultz/android-proguard-snippets/blob/master/';

got(treeUrl)
  .then(response => {
    const items = JSON.parse(response.body).tree;
    const output = JSON.stringify(items, null, '  ');
    fs.writeFileSync('pg.json', output);
    console.log(execSync('firebase database:set -y /pg pg.json', {
      encoding: 'utf-8'
    }));
  })
  .catch(error => {
    console.log(error);
  });
