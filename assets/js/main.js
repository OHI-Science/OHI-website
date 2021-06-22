/**
 * @file The entry point for all of the JS used by the OHI website. Hugo imports and
 * builds this script in the template layouts/_default/baseof.html
 */

// Parameters imported from the baseof.html template which builds the JS
import params from '@params'

// Functions for the main navigation menu.
import nav from './partials/nav/nav.js'

// Functions that fetch data files and process them for use in data viz
import data from "./data-viz/data.js"

// What to do when the DOM has loaded
async function callback() {

  // Enable the navigation functions
  nav.init();

  // Test getting & processing the OHI data
  const ohiData = await data(JSON.parse(params.dataConfig));
  console.log(ohiData);

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
