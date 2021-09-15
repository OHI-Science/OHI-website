import baseTooltip from './tooltip.js'

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
 * @property {number} circleRadius - The radius of the circle that contains the number in
 * the tooltip
 * @property {number} fontSize - The size of the font that shows the number in the tooltip
 * @property {number} offsetX - A positive or negative number that provides the offset to
 * add to the x position passed to the reposition function
 * @property {number} offsetY - A positive or negative number that provides the offset to
 * add to the y position passed to the reposition function
 * @property {TooltipClasses} classes - Classes to add to the HTML elements created by
 * this function
 * @returns {Object} returns functions for updating and interacting with the tooltips
 */
function regionTooltip({
  containerSelector = 'body',
  displayProperty = 'grid',
  circleRadius = 15,
  fontSize = 14,
  offsetX = 7,
  offsetY = -15,
  classes = {
    tooltip: 'region-tooltip',
  },
} = {}) {

  const tooltip = baseTooltip({
    containerSelector: containerSelector,
    displayProperty: displayProperty,
    offsetY: offsetY,
    offsetX: offsetX
  });
  
  const tooltipSelection = tooltip.tooltipSelection
  // Clear the default contents of the tooltip element
  tooltip.tooltipSelection.node().innerHTML = '';
  // Add the region class to the tooltip element
  tooltip.tooltipSelection.node().classList.add(classes.tooltip)

  // Create a span to update with region name
  const tooltipRegionText = tooltipSelection.append('span')

  // Add a circle in the tooltip to show the score of the hovered region
  const tooltipSvg = tooltipSelection
    .append('svg')
    .attr('preserveAspectRatio', 'xMidYMid')
    .attr('height', (circleRadius * 2))
    .attr('width', (circleRadius * 2));

  const tooltipScoreCircle = tooltipSvg.append('circle')
    .attr('r', circleRadius)
    .attr('cx', circleRadius)
    .attr('cy', circleRadius)

  const tooltipScoreText = tooltipSvg
    .append('text')
    .attr('x', circleRadius)
    .attr('y', circleRadius)
    .attr('font-size', fontSize)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('fill', 'black')

  // Change the tooltip update function. Update the name, number, and circle color of the
  // tooltip. Make sure it's not hidden.
  function update(text, num, color) {

    // Round the number displayed in the circle
    const displayNumber = num || num === 0 ? Math.round(num) : 'NA'

    tooltipRegionText
      .text(text)

    tooltipScoreText
      .text(displayNumber)

    tooltipScoreCircle
      .attr('fill', color)

    tooltipSelection
      .style('display', displayProperty)
      .style('opacity', 1);

  }

  return Object.freeze(
    {
      update: update,
      hide: tooltip.hide,
      reposition: tooltip.reposition,
      tooltipSelection: tooltipSelection
    }
  )

};

export default regionTooltip