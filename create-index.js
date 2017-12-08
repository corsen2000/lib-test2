const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const slash = require('slash');

const indexes = glob.sync('lib/**/index.js');

function ensureExplicitRelative(path) {
  if (path[0] !== '.') {
    return `./${path}`;
  } else {
    return path;
  }
}

indexes.forEach((index) => {
  const indexDir = path.dirname(index);

  const unrootedPath = index.replace('lib/', './');
  const unrootedPathDir = path.dirname(unrootedPath);

  const relativeIndexPath = ensureExplicitRelative(slash(path.relative(unrootedPathDir, indexDir)));

  const rootIndexContent = `module.exports = require('${relativeIndexPath}');`;

  fs.outputFileSync(unrootedPath, rootIndexContent);
});