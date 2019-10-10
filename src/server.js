import { html } from 'htm/preact';
import render from 'preact-render-to-string';
import { App } from './components/App.js';
import getGradientProperties from './util/get-gradient.js';

export function renderApp({ css, bgColor, shadowColor, pxSize }) {
  const { gradientBackground, gradientBackgroundSize } = getGradientProperties({
    bgColor,
    shadowColor,
    pxSize
  });

  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css?family=Comfortaa:700&display=swap&text=CSS%20Scroll%20Shadows" rel="stylesheet">
        <style>
          :root {
            --bgColor: ${bgColor};
            --shadowColor: ${shadowColor};
            --gradientBg: ${gradientBackground};
            --gradientBgSize: ${gradientBackgroundSize}
          }

          .gradient {
            background: var(--gradientBg);
            background-color: var(--bgColor);
            background-repeat: no-repeat;
            background-attachment: local, local, scroll, scroll;
            background-size: var(--gradientBgSize);
          }

          ${css}
        </style>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>CSS scroll shadows</title>
        <script type="module">
          import {renderApp} from './static/bundle.js';
          renderApp({bgColor: '${bgColor}', shadowColor: '${shadowColor}', pxSize: ${pxSize}});
        </script>
      </head>
      <body>
        <main class="gradient">${render(
          html`
            <${App}
              bgColor=${bgColor}
              shadowColor=${shadowColor}
              pxSize=${pxSize}
            />
          `
        )}</main>
      </body>
      </html>
    `;
}
