import { html } from 'htm/preact';
import { render } from 'preact';
import { App } from './components/App.js';

export function renderApp({ bgColor, shadowColor, pxSize }) {
  return render(
    html`
      <${App}
        bgColor=${`${bgColor}`}
        shadowColor=${`${shadowColor}`}
        pxSize=${pxSize}
      />
    `,
    document.querySelector('main')
  );
}
