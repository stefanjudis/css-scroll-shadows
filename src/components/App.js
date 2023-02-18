import { html } from 'htm/preact';
import { useEffect, useState } from 'preact/hooks';
import getGradientProperties from '../util/get-gradient.js';
import a11yColor from 'a11ycolor';

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
  const [bgColor, setBgColor] = useState(props.bgColor);
  const [shadowColor, setShadowColor] = useState(props.shadowColor);
  const [pxSize, setPxSize] = useState(props.pxSize);
  const [cssWasCopied, setCssWasCopied] = useState(false);

  const { gradientBackground: gb, gradientBackgroundSize: gbs } =
    getGradientProperties({
      bgColor,
      pxSize,
      shadowColor,
    });

  const [gradientBackground, setGradientBackground] = useState(gb);
  const [gradientBackgroundSize, setGradientBackgroundSize] = useState(gbs);

  useEffect(() => {
    updateHistory({ bgColor, shadowColor, pxSize });

    document.documentElement.style.setProperty('--bgColor', bgColor);
    document.documentElement.style.setProperty('--shadowColor', shadowColor);
    document.documentElement.style.setProperty(
      '--textColor',
      a11yColor('#555', bgColor)
    );

    const { gradientBackground, gradientBackgroundSize } =
      getGradientProperties({
        bgColor,
        pxSize,
        shadowColor,
      });

    setGradientBackground(gradientBackground);
    setGradientBackgroundSize(gradientBackgroundSize);
    setCssWasCopied(false);
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

  const CSS = [
    '.scrollGradient {',
    [
      `background: ${gradientBackground};`,
      `background-color: ${bgColor};`,
      `background-repeat: no-repeat;`,
      `background-attachment: local, local, scroll, scroll;`,
      `background-size: ${gradientBackgroundSize};`,
    ]
      .map((l) => `  ${l}`)
      .join('\n'),
    '}',
  ].join('\n');

  function copyCSS(CSS) {
    // https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
    // too lazy to think about that, sorry...
    const el = document.createElement('textarea');
    el.value = CSS;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    setCssWasCopied(true);
  }

  return html`
    <div class="container">
      <a
        href="https://github.com/stefanjudis/css-scroll-shadows/"
        class="github-corner"
        aria-label="View source on GitHub"
        ><svg
          width="80"
          height="80"
          viewBox="0 0 250 250"
          style="color:#fff; position: absolute; top: 0; border: 0; right: 0;"
          aria-hidden="true"
        >
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            class="svg-fill-bg"
            style="transform-origin: 130px 106px;"
          ></path>
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            class="svg-fill-bg"
          ></path></svg
      ></a>
      <div class="box">
        <h1>CSS Scroll Shadows!</h1>
        <p class="intro">
          Adjust the controls (👇) and see the CSS scroll shadows change
        </p>
        <div class="controls">
          <label>
            <span>Background color</span>
            <input
              type="color"
              value=${bgColor}
              onInput=${(e) => setBgColor(e.target.value)}
            />
          </label>
          <label>
            <span>Shadow color</span>
            <input
              type="color"
              value=${shadowColor}
              onInput=${(e) => setShadowColor(e.target.value)}
            />
          </label>

          <label>
            <span>Shadow size</span>
            <input
              type="range"
              min="5"
              max="50"
              value=${pxSize}
              onInput=${(e) => setPxSize(e.target.value)}
            />
          </label>
        </div>

        <div class="mini-scroll gradient">
          <div>
            <p>
              Scroll down and watch the CSS scroll shadows disappear/appear...
            </p>
            <svg
              width="100pt"
              height="100pt"
              version="1.1"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m97.5 50c0-26.199-21.301-47.5-47.5-47.5s-47.5 21.301-47.5 47.5 21.301 47.5 47.5 47.5 47.5-21.301 47.5-47.5zm-51.199 25.602-15.902-15.902c-1-1-1.5-2.3008-1.5-3.6992s0.5-2.6992 1.5-3.6992c2-2 5.3008-2 7.3984 0l7 7 0.003906-31.301c0-2.8984 2.3008-5.1992 5.1992-5.1992s5.1992 2.3008 5.1992 5.1992v31.398l7-7c2-2 5.3008-2 7.3984 0 2 2 2 5.3008 0 7.3984l-15.898 15.805c-2.0977 2.0977-5.3008 2.0977-7.3984 0z"
              />
            </svg>
          </div>
        </div>

        <div class="code">
          <pre><code>
          ${CSS}
          </code></pre>
        </div>

        ${
          cssWasCopied
            ? html`
                <button type="button" disabled>
                  CSS was copied to your clipboard...
                </button>
              `
            : html`
                <button type="button" onClick=${(e) => copyCSS(CSS)}>
                  Copy CSS
                </button>
              `
        }

        <p>
          If you want to learn how this works check ${' '}<a
            href="http://lea.verou.me/2012/04/background-attachment-local/"
            >this article</a
          >
          ${' '}by${' '}
          <a href="https://twitter.com/LeaVerou">Lea Verou</a>.
        </p>

        <p>
          <strong style="display: block; margin-bottom: 0.5em;"
            >Watch out for some iOS versions!</strong
          >${' '}
          <a href="https://caniuse.com/background-attachment"
            ><code>background-attachment</code>: local</code> didn't work on IOS 13</a
          >but has been fixed and works again on iOS 15+.
        </p>

        <footer>
          <h2>Built with:</h2>
          <ul class="stackList">
            <li>
              <a href="https://preactjs.com">Preact</a> – client and server-side
              rendering
            </li>
            <li>
              <a href="https://postcss.org">PostCSS</a> – to write future CSS
              today
            </li>
            <li>
              <a href="https://github.com/developit/htm">htm</a> – to not deal
              with JSX
            </li>
            <li>
              <a href="https://zeit.co/home">now.sh</a> – to easily deploy a
              serverless function
            </li>
          </ul>

          <p class="u-marginTopLarge">
            Brought to you by${' '}
            <a href="https://twitter.com/stefanjudis">Stefan Judis</a>.
          </p>
        </footer>
      </div>
    </div>
  `;
}
