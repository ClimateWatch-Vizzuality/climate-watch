const fs = require('fs');
const path = require('path');

const componentsFolder = fs.readdirSync(
  path.join(__dirname, '../../app/components')
);
const pageFolder = fs.readdirSync(path.join(__dirname, '../../app/pages'));
const components = componentsFolder.concat(pageFolder);

function componentExists(comp) {
  return components.indexOf(comp) >= 0;
}

module.exports = componentExists;
