require = require('esm')(module);
const { renderApp } = require('./src/server.js');

const defaults = require('./defaults.js');
const { readFile } = require('fs').promises;
const { join } = require('path');

module.exports = async (req, res) => {
  const { bgColor, shadowColor, pxSize } = { ...defaults, ...req.query };

  const css = await readFile(join(__dirname, 'static', 'main.css'));
  res.status(200).send(
    renderApp({
      css,
      bgColor: `#${bgColor}`,
      shadowColor: `#${shadowColor}`,
      pxSize
    })
  );
};
