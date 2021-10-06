// parameters imported from the baseof.html template which builds the JS
import * as params from '@params'

/**
 * CSS Selector strings to select HTML elements that make up the TOC
 * @typedef {Object} TOCSelectors
 * @property {string} mainContainer The entire block (including TOC & content)
 * @property {string} toc The table of contents
 * @property {string} content The contents that the TOC refers to (i.e. the text with ids)
 * @property {string} tocContainer The element that doesn't get affixed but that contains
 * the TOC
 * @property {string} list The <ul> or <ol> elements that makes up the TOC (relative to
 * the selectors.toc selector)
 * @property {string} button The buttons used to open/close the TOC on small screens
 * (relative to the selectors.toc selector)
 * @property {string} items The <li> elements within the TOC. <li> must contain an <a>.
 * (relative to the selectors.toc selector)
 * @property {string} nav The nav element that surrounds the TOC (relative to the
 * selectors.toc selector)
 */

/**
 * Creates an interactive table of contents if the right HTML elements exist in the page.
 * @param {Object} options - Configurable options for the TOC.
 * @property {TOCSelectors} selectors - CSS Selector strings to select HTML elements that
 * make up the TOC
 * @property {Object} classes - Classes to add/remove to elements depending on their state
 * @property {number} breakpoint - Screen width at which to switch from mobile style rules
 * to desktop styles.
 *
 */
function init({
  selectors = {
    mainContainer: ".toc",
    toc: ".toc__toc",
    content: ".toc__content",
    tocContainer: ".toc__toc-container",
    list: "ul, ol",
    button: ".toc__button",
    items: "li",
    nav: "nav"
  },
  classes = {
    affixedMobile: "toc__toc--affixed-mobile",
    affixedDesktop: "toc__toc--affixed-desktop",
    active: "active"
  },
  breakpoint = params.breakpoint,
} = {}) {

  const elements = selectElements();
  const tocExists = elements.button !== null &&
    elements.button !== undefined &&
    elements.list !== null &&
    elements.list !== undefined

  // Only continue if the the necessary TOC elements exist in the page
  if (!tocExists) {
    return
  }

  // Set a minimum height for the nav container to keep it from glitching on mobile
  setTimeout(function () {
    elements.tocContainer.style.minHeight = (elements.toc.offsetHeight + 2) + "px";
  }, 500);
  // Start the list as hidden (for mobile)
  elements.list.setAttribute("aria-hidden", "false"); // TODO?
  // Add a link to identify the toc links
  setListeners();

  /**  
   * throttle - Limits the number of times that a function can be called within a time
   * period. From: https://www.afasterweb.com/2017/09/26/performance-basics-throttling/
   *
   * @param  {function} fn The function to throttle  
   * @param  {number}   wait    Minimum milliseconds to wait before allowing the callback
   * function to be called again 
   * @return {function} Returns the callback function wrapped in the throttle function 
   */
  function throttle(fn, wait) {
    var time = Date.now();
    return function () {
      if ((time + wait - Date.now()) < 0) {
        fn();
        time = Date.now();
      }
    }
  }

  /**    
   * selectElements - Select all of the elements that this script will manipulate.
   */
  function selectElements() {

    const elements = {}
    // Select the TOC items
    elements.el = document.querySelector(selectors.mainContainer);
    elements.toc = document.querySelector(selectors.toc);
    elements.content = document.querySelector(selectors.content);

    if (elements.el) {
      elements.tocContainer = elements.el.querySelector(selectors.tocContainer);
    }

    if (elements.toc) {

      elements.list = elements.toc.querySelector(selectors.list);
      elements.button = elements.toc.querySelector(selectors.button);
      elements.nav = elements.toc.querySelector(selectors.nav);

      elements.items = [];

      elements.toc.querySelectorAll(selectors.items).forEach(function (item, index) {

        var link = item.querySelector("a");
        // Don't count items without links
        if (link) {
          const href = link.getAttribute("href");
          const targetSelector = href.substring(href.lastIndexOf("#") + 1);
          const id = "item__" + targetSelector;
          const lastChild = item.querySelector("ol li:last-child, ul li:last-child");

          item.setAttribute("id", id);

          elements.items[index] = {
            index: index,
            el: item,
            href: href,
            id: id,
            targetIdSelector: targetSelector,
            hrefDestEl: document.getElementById(targetSelector),
            lastChild: lastChild
          }
        }
      })
    }
    return elements
  }

  /**    
   * setListeners - set the event listeners that will trigger scrollspy behaviour, opening
   * and closing the TOC, etc.  
   */
  function setListeners () {

    // Scroll and resize events
    window.removeEventListener("scroll", throttle(classChangeEvents, 20), false);
    window.addEventListener("scroll", throttle(classChangeEvents, 20), false);
    window.removeEventListener("resize", throttle(classChangeEvents, 20), false);
    window.addEventListener("resize", throttle(classChangeEvents, 20), false);

    // If on mobile, and menu is affixed, then close menu on item click
    elements.items.forEach(item => {
      item.el.addEventListener('click', function () {
        var winWidth = window.innerWidth || document.documentElement.clientWidth;
        if (
          (winWidth < breakpoint) &&
          elements.toc.classList.contains(classes.affixedMobile)
        ) {
          toggleTOC(true);
        }
      });
    });

    // Show/hide the TOC when the button is clicked (on mobile)
    elements.button.addEventListener("click", function () {
      if (tocExists) {
        var open = JSON.parse(elements.button.getAttribute("aria-expanded"));
        toggleTOC(open);
      }
    });
  }

  /**    
   * Event handler for scroll and & window resize. Updates the TOC.
   */
  function classChangeEvents() {

    // Check if menu is changing from not affixed to affixed on mobile
    var isAffixedBefore = elements.toc.classList.contains(classes.affixedMobile);

    // Affix TOC on scroll MOBILE
    elementFromTop(
      elemTrigger = [elements.el],
      targetElSelector = selectors.toc,
      classToAdd = classes.affixedMobile,
      distanceFromTop = -(elements.toc.offsetHeight - 100),
      unit = 'pixels',
      offset = (elements.toc.offsetHeight - 100)
    );

    // If menu changed from not affixed to affixed on mobile, minimize TOC
    var isAffixedAfter = elements.toc.classList.contains(classes.affixedMobile);
    if (!isAffixedBefore && isAffixedAfter) {
      toggleTOC(true);
    }

    // Affix TOC on scroll (affix soooner if on DESKTOP)
    elementFromTop(
      elemTrigger = [elements.el],
      targetElSelector = selectors.toc,
      classToAdd = classes.affixedDesktop,
      distanceFromTop = 0,
      unit = 'pixels',
      offset = elements.toc.offsetHeight
    );

    // Scrollspy - activate menu link when corresponding section comes into view.
    elements.items.forEach(function (item, index) {
      // Get the position of the next element to calculate the offset
      var nextItem = elements.items[index + 1];
      var offset;

      // Keep parent active when child elements are active
      if (item.lastChild && item.lastChild != null) {
        var lastChildObj = elements.items.find(function (searchItem) {
          // Sometimes there are empty items!
          if (searchItem) {
            return searchItem.id == item.lastChild.id
          }
        }),
        nextItem = elements.items[lastChildObj.index + 1];
      }
      // Otherwise, keep active until the next item becomes active
      if (nextItem) {
        offset = (nextItem.hrefDestEl.getBoundingClientRect().top - item.hrefDestEl.getBoundingClientRect().top) - item.hrefDestEl.offsetHeight;
        // Otherwise, stay active until the end of the entire block
      } else {
        offset = (elements.el.getBoundingClientRect().bottom - item.hrefDestEl.getBoundingClientRect().top);
      }

      elementFromTop(
        elemTrigger = [item.hrefDestEl],
        targetElSelector = "#" + item.id,
        classToAdd = classes.active,
        distanceFromTop = 159,
        unit = 'pixels',
        offset = ((offset - 160) * (-1))
      );

    });

    // If on desktop, make sure that all of TOC is shown. Also make sure it's shown when
    // it's not affixed on Mobile
    var winWidth = window.innerWidth || document.documentElement.clientWidth;
    if (winWidth >= breakpoint || (!elements.toc.classList.contains(classes.affixedMobile))) {
      toggleTOC(false);
    }

  }

  /**
   * toggleTOC - Sets or unsets the aria-expanded and aria-hidden attributes on the
   * TOCmenu and tocMenu button.
   * @param {boolean} open - indicates whether the menu should be closed (true) or open
   * (false).
   */
   function toggleTOC (open) {

    try {
      if (tocExists) {
        elements.button.setAttribute("aria-expanded", !open);
        elements.list.setAttribute("aria-hidden", open);
      }
    } catch (e) {
      console.log("Error toggling the TOC");
      console.log(e);
    }
  };

  /**  
   * elementFromTop - Adds or removes a class to an element based on its position in the
   * view window.
   *
   * @param  {HTMLElement} elemTrigger     The HTML element which will trigger
   * adding/removing a class when in view.  
   * @param  {string} targetElSelector        The class used to identify the target
   * element(s)
   * @param  {string} classToAdd           The class to add or remove to the target
   * element(s)
   * @param  {number} distanceFromTop      How far past the top of the view port should
   * the top of element be before the class is added? (in pixels or % of element height)
   * @param  {string} unit                 ('percent' or 'pixels')
   * @param  {number} offset               If set to 0, the class will be removed once the
   * users scrolls past the bottom of the element. If a + number, the class will be
   * removed sooner. If a - number, the class will be removed later.  
   */
  function elementFromTop(elemTrigger, targetElSelector, classToAdd, distanceFromTop, unit, offset) {

    var winY = window.innerHeight || document.documentElement.clientHeight,
      elTriggerLength = elemTrigger.length,
      elTargetLength, distTop, distPercent, distPixels, distUnit, elTarget, i, j;

    for (i = 0; i < elTriggerLength; ++i) {

      elTarget = document.querySelectorAll(targetElSelector);
      elTargetLength = elTarget.length;
      distTop = elemTrigger[i].getBoundingClientRect().top;
      distBottom = elemTrigger[i].getBoundingClientRect().bottom;
      distPercent = Math.round((distTop / winY) * 100);
      distPixels = Math.round(distTop);
      distUnit = unit == 'percent' ? distPercent : distPixels;

      if (!offset) {
        var offset = 0;
      }
      // If trigger in view, then
      if (distUnit <= distanceFromTop && (distBottom - offset) >= 0) {
        // For each of the targets
        for (j = 0; j < elTargetLength; ++j) {
          // If the doesn't already contain the active class
          if (!elTarget[j].classList.contains(classToAdd)) {
            // Add it
            elTarget[j].classList.add(classToAdd);
          }
        }
        // If not in view
      } else {
        // Then remove the classes
        elemTrigger[i].classList.remove(classToAdd);
        for (j = 0; j < elTargetLength; ++j) {
          elTarget[j].classList.remove(classToAdd);
        }
      }
    }
  }

}

export default { init }