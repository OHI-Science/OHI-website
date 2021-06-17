/**
 * @file The entry point for the nav component JS files. Includes functions for converting
 * the desktop (larger screen) version of the navigation to the mobile (smaller screen)
 * version.
 * 
 * Related files:
 *  - Nav styles: assets/scss/partials/nav.scss
 *  - Nav template: layouts/partials/nav.html
 */

// parameters imported from the baseof.html template which builds the JS
import * as params from '@params'
// The main navigation menu
import Menubar from './Menubar.js'

// Screen width at which to switch from mobile style rules to desktop styles (pixels).
const breakpoint = params.breakpoint || 700;

// The element that contains all the main navigation elements
var menubarEl = null;
// The element that toggles the entire menu on mobile mode
var menuToggle = null;
// The accessible menu bar
var menubar = null;

// The throttle delay, in MS, for the window resize event, when the menu is switched
// between mobile and desktop mode.
const delay = 10;
// Whether or not the resize event is throttled.
var throttled = false;

/*
 * Set up the menu - function to run when the entire DOM has been loaded.
*/
function init() {
  
  // Save a reference to the main menu elements created by the nav.html template
  menubarEl = document.getElementById('main-menu');
  menuToggle = document.getElementById('menu-button');

  // Initialize the accessible menu bar
  menubar = new Menubar(menubarEl, breakpoint);
  menubar.init();

  // Set the toggle action on the mobile menu button
  menuToggle.addEventListener("click", toggleMenu);

  // Set the menu to mobile mode if required
  checkIfMobile()

  // Set a throttled listener to check if menu is in mobile mode when the screen is
  // re-sized. The throttle delay can't be too large or the transition from desktop to
  // mobile or mobile to desktop will sometimes be skipped.
  window.addEventListener('resize', function () {
    // only run if not throttled
    if (!throttled) {
      // actual callback action
      checkIfMobile();
      throttled = true;
      // set a timeout to un-throttle
      setTimeout(function () {
        throttled = false;
      }, delay);
    }
  });
}

/*
 * Sets the isMobile flag to true in the menu if the screen width is less than the
 * breakpoint
*/
function checkIfMobile() {
  if (window.innerWidth < breakpoint) {
    // If the menu just converted to mobile mode...
    if (menubar.isMobile === false) {
      // Ensure the menu is hidden to start
      hideMenubar()
    }
    menubar.isMobile = true
  } else {
    // If the menu just converted to desktop mode...
    if (menubar.isMobile === true) {
      // Ensure the menu is not hidden
      showMenubar()
      // Close all of the sub-menus
      menubar.closeAllPopups();
    }
    menubar.isMobile = false
  }
}

/*
 * The action when the mobile menu button is clicked
*/
function toggleMenu() {
  if (menubarEl.style.visibility === "hidden") {
    showMenubar()
  } else {
    // Close all of the sub-menus
    menubar.closeAllPopups();
    hideMenubar()
  }
}

/*
 * Hide the menu bar with a fade transition (for mobile version)
*/
function hideMenubar() {
  // Leave time for CSS transitions
  menuToggle.setAttribute("aria-expanded", false);
  menuToggle.setAttribute("aria-label", "Show main menu");
  menubarEl.style.transition = "500ms opacity";
  menubarEl.style.opacity = "0";
  setTimeout(() => {
    menubarEl.style.width = "0px";
    menubarEl.style.margin = "0 0 0 -50px";
    menubarEl.style.visibility = "hidden";
  }, 500);
  
}

/*
 * Show the menu bar with a fade transition (for mobile version)
*/
function showMenubar() {
  menuToggle.setAttribute("aria-expanded", true);
  menuToggle.setAttribute("aria-label", "Hide main menu");
  menubarEl.style.opacity = "1";
  menubarEl.style.width = "100%";
  menubarEl.style.margin = "0";
  menubarEl.style.visibility = "visible";
}

export default { init }