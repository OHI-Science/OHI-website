/**
 * @file The entry point for all of the JS used by the OHI website. Hugo imports and
 * builds this script in the template layouts/_default/baseof.html
 */

// Parameters imported from the baseof.html template which builds the JS
import params from '@params'

// Functions for the main navigation menu.
import nav from './partials/nav/nav.js'

// What to do when the DOM has loaded
async function callback() {

  // Enable the navigation functions
  nav.init();

  // If the scoresGlobe short code is used in this page, then render the interactive globe
  // with scores.
  const scoresGlobeEls = document.querySelectorAll(".global-scores");
  if (scoresGlobeEls) {
    import('./data-viz/globalScores.js')
      .then(function (globalScores) {
        scoresGlobeEls.forEach(function (scoresGlobeEl) {
          globalScores.default({
            container: scoresGlobeEl
          });
        })
      })
  }

  // If this is a region scores page, then render the regional aster plot.
  const regionalAsterEls = document.querySelectorAll(".regional-aster");
  if (regionalAsterEls) {
    import('./data-viz/regionalAster.js')
      .then(function (regionalAster) {
        regionalAsterEls.forEach(function (regionalAsterEl) {
          regionalAster.default({
            container: regionalAsterEl,
            regionId: regionalAsterEl.dataset.regionId,
          })
        })
      })
  }

};

// Check if the DOM is ready, then call the callback function
if (
  document.readyState === 'complete' ||
  (document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener('DOMContentLoaded', callback);
}
