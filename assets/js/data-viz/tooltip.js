let d3 = window.d3;

// if (!d3) {
//   d3 = Object.assign(
//     {},
//     require('d3-selection')
//   );
// }

/**
 * The classes to add to the various HTML elements that are combined to create a tooltip.
 * The specific HTML elements are defined in the property definitions.
 * @typedef {Object} TooltipClasses
 * @property {string} tooltip - The main tooltip div. If the tooltip's position is set
 * with x and y coordinates, the element's position style should be set to 'absolute'.
 */

/**
 * Creates a tooltip with some text, and a circle that contains a number. The text,
 * number, and circle color are all configurable with update().
 * @param {Object} options - Configurable options for the tooltips
 * @property {string} containerSelector - The selector to use with d3.select to get the
 * container which should hold the tooltip element. (This element's position should be set
 * to relative, if the tooltips are to be positioned absolutely relative to this element.)
 * @property {string} displayProperty - The CSS display property of the tooltip when it
 * isn't hidden, e.g. 'block', 'grid', 'flex', etc.
 * @property {number} offsetX - A positive or negative number that provides the offset to
 * add to the x position passed to the reposition function
 * @property {number} offsetY - A positive or negative number that provides the offset to
 * add to the y position passed to the reposition function
 * @property {TooltipClasses} classes - Classes to add to the HTML elements created by
 * this function
 * @returns {Object} returns functions for updating and interacting with the tooltips
 */
function tooltip({
  containerSelector = 'body',
  displayProperty = 'grid',
  offsetX = 7,
  offsetY = -15,
  classes = {
    tooltip: 'tooltip',
  },
} = {}) {

  // Create and hide the tooltip
  const tooltipSelection = d3.select(containerSelector)
    .append('div')
    .attr('class', classes.tooltip)

  hide();

  // Create a span to update with region name
  const tooltipText = tooltipSelection.append('span')

  // Update the name, number, and circle color of the tooltip. Make sure it's not hidden.
  function update(text) {

    tooltipText.text(text)

    tooltipSelection
      .style('display', displayProperty)
      .style('opacity', 1);

  }

  // Hide the tooltip
  function hide(event, feature) {
    tooltipSelection.style('opacity', 0)
      .style('display', 'none');
  }

  // Change the x and y location of the tooltip
  function reposition(x, y, addTooltipHeight = false, addHalfTooltipWidth = false) {
    let tooltipDimensions = null
    if (addTooltipHeight || addHalfTooltipWidth) {
      tooltipDimensions = tooltipSelection.node().getBoundingClientRect()
    }
    if (addTooltipHeight) {
      y -= tooltipDimensions.height
    }
    if (addHalfTooltipWidth) {
      x -= (tooltipDimensions.width * 0.5)
    }
    tooltipSelection
      .style('left', x + offsetX + 'px')
      .style('top', y + offsetY + 'px');
  }

  return Object.freeze({
    update, hide, reposition, tooltipSelection
  })

};

export default tooltip