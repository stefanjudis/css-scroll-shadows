require = require('esm')(module);
const { renderApp } = require('../src/server.js');

const defaults = require('../defaults.js');
const { readFile: fsReadFile } = require('fs');
const { promisify } = require('util');
const { join } = require('path');
const randomColor = require('randomcolor');
const readFile = promisify(fsReadFile);

module.exports = async (req, res) => {
  const { bgColor, shadowColor, pxSize } = {
    ...defaults,
    ...{ bgColor: randomColor().replace('#', '') },
    ...req.query,
  };

  const css = await readFile(join(__dirname, '..', 'main.css'));
  res.status(200).send(
    renderApp({
      css,
      bgColor: `#${bgColor}`,
      shadowColor: `#${shadowColor}`,
      pxSize,
    })
  );
};
