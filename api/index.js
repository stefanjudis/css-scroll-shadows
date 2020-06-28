require = require('esm')(module);
const { renderApp } = require('../src/server.js');

const defaults = require('../defaults.js');
const randomColor = require('randomcolor');

module.exports = async (req, res) => {
  const { bgColor, shadowColor, pxSize } = {
    ...defaults,
    ...{ bgColor: randomColor().replace('#', '') },
    ...req.query,
  };

  res.status(200).send(
    renderApp({
      bgColor: `#${bgColor}`,
      shadowColor: `#${shadowColor}`,
      pxSize,
    })
  );
};
