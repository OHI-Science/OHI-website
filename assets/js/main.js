/**
 * @file The entry point for all of the JS used by the OHI website. Hugo imports and
 * builds this script in the template layouts/_default/baseof.html
 */

// What to do when the DOM has loaded
async function callback() {
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