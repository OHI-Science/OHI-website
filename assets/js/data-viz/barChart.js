const d3 = Object.assign(
  {},
  require("d3-selection"),
  require("d3-array"),
  require("d3-scale")
);

import regionTooltip from "./regionTooltip.js"

/**
 * The classes to add to the various HTML elements that are combined to create a bar
 * chart. The specific HTML elements are defined in the property definitions.
 * @typedef {Object} BarChartClasses
 * @property {string} barChart - The entire container
 * @property {string} plot - The aster plot with legend
 * @property {string} bar - Each individual bar in the plot
 * @property {string} barHighlighted - Extra class to add to bars that should be highlighted
 */

/**
 * A single data point in a set of bar chart data. A datum is represented by one bar.
 * @typedef {Object} BarChartDatum
 * @property {number} id - A unique for this point.
 * @property {number} label - A user-facing label for this point, to show in tooltips.
 * @property {number} value - The value on the y-axis, represented by the height of the bar.
 */

/**
 * An object that defines the margins on four sides of an element. Values are in pixels.
 * @typedef {Object} Margin
 * @property {number} top - The margin at the top.
 * @property {number} right - The margin at the right.
 * @property {number} bottom - The margin at the bottom.
 * @property {number} left - The margin at the left.
 */

/**
 * Creates a minimal bar chart without axes.
 * @param {Object} options - Configurable options for the aster plot for a region with
 * time line slider.
 * @property {HTMLElement} container - The container into which the bar chart
 * visualization should be inserted
 * @property {BarChartDatum[]} data - An array of data points to show in the bar chart.
 * Bars are sorted in the order they appear in the array.
 * @property {number} [width] - The relative width of the plot, in pixels
 * @property {number} [height] - The relative height of the plot, in pixels
 * @property {number|string} [minY] - The minimum value on the y-axis. If set to "auto",
 * then the value will be set to the minimum value in the data, minus the domainPaddingY.
 * @property {number|string} [maxY] - The maximum value on the y-axis. If set to "auto",
 * then the value will be set to the maximum value in the data, plus the domainPaddingY.
 * @property {number} [domainPaddingY] - Extra values to add on either side of the y-axis
 * range.
 * @property {number} [barPadding] - The horizontal spacing between each bar
 * @property {function} [colorFunction] - Optional. A function that takes a datum's value
 * and returns a color. This will be used to color the value shown in the tooltip.
 * @property {Margin} [margin] - The margin around the plot
 * @property {BarChartClasses} [classes] - Classes to add to the HTML elements created by
 * this function
 * @returns {Object} returns functions for updating and interacting with the bar chart
 */
function barChart({
  container = null,
  data = null,
  width = 700,
  height = 150,
  minY = "auto",
  maxY = "auto",
  domainPaddingY = 3,
  barPadding = 0.2,
  colorFunction = null,
  margin = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
  },
  classes = {
    barChart: "bar-chart",
    plot: "bar-chart__plot",
    bar: "bar-chart__bar",
    barHighlighted: "bar-chart__bar--highlight"
  }
} = {}) {

  if (!container) {
    console.log('A container is required to render a bar chart.')
    return;
  }
  if (!data) {
    console.log('Data is required to render a bar chart.')
    return;
  }

  // Set the minimum and maximum values for the y-axis
  let minRange = minY;
  let maxRange = maxY;

  if (minY === "auto") {
    minRange = d3.min(data, d => d.value);
  }
  if (maxY === "auto") {
    maxRange = d3.max(data, d => d.value);
  }
  if (domainPaddingY) {
    minRange -= domainPaddingY
    maxRange += domainPaddingY
  }

  const y = d3.scaleLinear()
    .domain([minRange, maxRange]).nice()
    .range([height - margin.bottom, margin.top])

  const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(barPadding)

  const svg = d3.select(container)
    .classed(classes.barChart, true) // Ensure the container has the bar chart class
    .append('svg')
    .classed(classes.plot, true) // Add the plot class to the SVG element
    .attr('preserveAspectRatio', 'xMidYMid')
    .attr('viewBox', [0, 0, width, height])

  const group = svg.append("g");
  let bars = null

  // Create the tooltip elements
  const tooltip = regionTooltip({
    offsetY: -10,
    offsetX: 0
  });

  updateData(data)

  // Pass new data (type: { BarChartDatum[] }), and update the bar chart accordingly
  function updateData(newData) {
    bars = group.selectAll("rect")
      .data(data)
      .join("rect")
      .classed(classes.bar, true)
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.value))
      .attr("height", d => y(minRange) - y(d.value))
      .attr("width", x.bandwidth())
      .on('mouseover', function (event, d) {
        // Update the position and text of the tooltip.
        // The color for the score for the given bar
        let color = colorFunction ? colorFunction(d.value) : "grey"
        tooltip.update(d.label, d.value, color)
        const rectDims = this.getBoundingClientRect()
        const x = rectDims.left;
        const y = rectDims.top + document.documentElement.scrollTop;
        console.log(rectDims);
        tooltip.reposition(x, y, true, true)
      })
      .on('mouseout', tooltip.hide);
  }

  // Highlight a specific bar in the chart
  function focusBar(id) {
    bars.classed(classes.barHighlighted, function (d, i) {
      return d.id === id
    })
  }

  return Object.freeze({
    updateData, focusBar
  })

};

export default barChart