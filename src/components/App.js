import { html } from 'htm/preact';
import { useEffect, useState } from 'preact/hooks';
import getGradientProperties from '../util/get-gradient.js';
import a11yColor from 'a11yColor';

function updateHistory({ bgColor, shadowColor, pxSize }) {
  history.replaceState(
    {},
    document.title,
    `?bgColor=${bgColor.replace('#', '')}&shadowColor=${shadowColor.replace(
      '#',
      ''
    )}&pxSize=${pxSize}`
  );
}

export function App(props) {
  console.log(props);
  const [bgColor, setBgColor] = useState(props.bgColor);
  const [shadowColor, setShadowColor] = useState(props.shadowColor);
  const [pxSize, setPxSize] = useState(props.pxSize);

  const [gradientBackground, setGradientBackground] = useState(null);
  const [gradientBackgroundSize, setGradientBackgroundSize] = useState(null);

  useEffect(() => {
    updateHistory({ bgColor, shadowColor, pxSize });

    document.documentElement.style.setProperty('--bgColor', bgColor);
    document.documentElement.style.setProperty('--shadowColor', shadowColor);
    document.documentElement.style.setProperty(
      '--textColor',
      a11yColor('#555', bgColor)
    );

    const {
      gradientBackground,
      gradientBackgroundSize
    } = getGradientProperties({
      bgColor,
      pxSize,
      shadowColor
    });

    setGradientBackground(gradientBackground);
    setGradientBackgroundSize(gradientBackgroundSize);
  }, [bgColor, shadowColor, pxSize]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--gradientBg',
      gradientBackground
    );
  }, [gradientBackground]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--gradientBgSize',
      gradientBackgroundSize
    );
  }, [gradientBackgroundSize]);

  return html`
    <div class="container">
      <div class="box">
        <h1>CSS Scroll Gradients!</h1>
        <div class="controls">
          <label>
            <span>Background color</span>
            <input
              type="color"
              value=${bgColor}
              onInput=${e => setBgColor(e.target.value)}
            />
          </label>
          <label>
            <span>Shadow color</span>
            <input
              type="color"
              value=${shadowColor}
              onInput=${e => setShadowColor(e.target.value)}
            />
          </label>

          <label>
            <span>Shadow size</span>
            <input
              type="range"
              min="5"
              max="50"
              value=${pxSize}
              onInput=${e => setPxSize(e.target.value)}
            />
          </label>
        </div>

        <div class="mini-scroll gradient">
          <div>Scroll down and watch the gradient...</div>
        </div>

        <div class="code">
          <pre><code>${[
            `background: ${gradientBackground};`,
            `background-color: ${bgColor};`,
            `background-repeat: no-repeat;`,
            `background-attachment: local, local, scroll, scroll;`,
            `background-size: ${gradientBackgroundSize};`
          ].join('\n  ')}
          </code></pre>
        </div>
      </div>
    </div>
  `;
}
