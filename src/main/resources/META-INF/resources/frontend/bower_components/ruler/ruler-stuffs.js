/**
 * Thanks to Cezary Daniel Nowak
 * https://gist.github.com/CezaryDanielNowak/9074032
 * 
 * @type Number|Window.devicePixelRatio
 */
function devicePixelRatio2() {
  // based on http://snippets.pro/snippet/37-get-device-pixel-ratio-dpr/

  // Fix fake window.devicePixelRatio on mobile Firefox
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  if (window.devicePixelRatio !== undefined && !isFirefox) {
    return window.devicePixelRatio;
  } else if (window.matchMedia) {
    var mediaQuery = function(v, ov) {
      return "(-webkit-min-device-pixel-ratio: "+v+"),"
            +"(min--moz-device-pixel-ratio: "+v+"),"
            +"(-o-min-device-pixel-ratio: "+ov+"),"
            +"(min-resolution: "+v+"dppx)"
    };
    if (window.matchMedia(mediaQuery('1.5', '3/2')).matches)
      return 1.5;
    if (window.matchMedia(mediaQuery('2', '2/1')).matches)
      return 2;
    if (window.matchMedia(mediaQuery('0.75', '3/4')).matches)
      return 0.7;
  }
  return 1;
};

/**
 * Get real pixel ratio. Page zoom is included in calculation of real pixel ratio,
 * so it's valid solution for desktops.
 *
 * @return {Object}
 */
const getPixelRatio = () => {
  const STEP = 0.05;
  const MAX = 5;
  const MIN = 0.5;
  const mediaQuery = (v) => `(-webkit-min-device-pixel-ratio: ${v}),
  (min--moz-device-pixel-ratio: ${v}),
  (min-resolution: ${v}dppx)`;

  // * 100 is added to each constants because of JS's float handling and
  // numbers such as `4.9-0.05 = 4.8500000000000005`
  let maximumMatchingSize;
  for (let i = MAX * 100; i >= MIN * 100; i -= STEP * 100) {
    if (window.matchMedia(mediaQuery(i / 100)).matches ) {
      maximumMatchingSize = i / 100;
      break;
    }
  }

  return {
    isZoomed: window.devicePixelRatio === undefined
      ? 'unknown'
      : parseFloat(window.devicePixelRatio) !== parseFloat(maximumMatchingSize),
    devicePixelRatio: window.devicePixelRatio,
    realPixelRatio: maximumMatchingSize,
  }
}