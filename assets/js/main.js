/**
 * @file The entry point for all of the JS used by the OHI website. Hugo imports and
 * builds this script in the template layouts/_default/baseof.html
 */

// Parameters imported from the baseof.html template which builds the JS
import params from '@params'

// Functions for the main navigation menu.
import nav from './partials/nav/nav.js'
// Data visualizations
import dataviz from './data-viz/dataviz.js'
// Table of contents
import toc from './toc.js';

// What to do when the DOM has loaded
async function callback() {

  // Enable the navigation functions
  nav.init();

  // Render any data visualizations that are on the page
  dataviz.init();
  
  // Set up the table of contents functions, if there is a TOC.
  toc.init();

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
