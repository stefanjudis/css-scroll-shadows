function hexToRgbA(hex, alpha) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return (
      'rgba(' +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
      `, ${alpha})`
    );
  }
  throw new Error('Bad Hex');
}

export default function({ bgColor, shadowColor, pxSize }) {
  // const gradientCSS = `
  // background:
  // /* Shadow covers */
  // linear-gradient(${bgColor} 30%, ${hexToRgbA(bgColor, 0)}),
  // linear-gradient(${hexToRgbA(bgColor, 0)}, ${bgColor} 70%) 0 100%,

  // /* Shadows */
  // radial-gradient(farthest-side at 50% 0, ${hexToRgbA(
  //   shadowColor,
  //   0.5
  // )}, rgba(0,0,0,0)),
  // radial-gradient(farthest-side at 50% 100%, ${hexToRgbA(
  //   shadowColor,
  //   0.5
  // )}, rgba(0,0,0,0)) 0 100%;
  // // background-repeat: no-repeat;
  // // background-color: ${bgColor};
  // // background-size: 100% 40px, 100% 40px, 100% ${pxSize}, 100% ${pxSize};
  // // background-attachment: local, local, scroll, scroll;
  // `;

  return {
    gradientBackground: `
    linear-gradient(${bgColor} 30%, ${hexToRgbA(bgColor, 0)}),
    linear-gradient(${hexToRgbA(bgColor, 0)}, ${bgColor} 70%) 0 100%,
    radial-gradient(farthest-side at 50% 0, ${hexToRgbA(
      shadowColor,
      0.5
    )}, rgba(0,0,0,0)),
    radial-gradient(farthest-side at 50% 100%, ${hexToRgbA(
      shadowColor,
      0.5
    )}, rgba(0,0,0,0)) 0 100%`,
    gradientBackgroundSize: `100% ${pxSize * 2}px, 100% ${pxSize *
      2}px, 100% ${pxSize}px, 100% ${pxSize}px`
  };
}
