let d3 = window.d3;

import regionTooltip from './regionTooltip.js'

/**
 * The classes to add to the various HTML elements that are combined to create an gauge
 * plot. The specific HTML elements are defined in the property definitions.
 * @typedef {Object} TimeSeriesClasses
 * @property {string} timeSeries The outer-most container element
 * @property {string} plot The SVG that holds the time series
 * @property {string} line Class for lines/paths in the time series
 * @property {string} lineFocused Class to add to lines when a user has their mouse over
 * them (lines that are in focus)
 * @property {string} lineBackground Class to add to lines that are not hovered when
 * another one is (lines that are out of focus)
 * @property {string} lineHighlighted Classes to add to lines that are always highlighted,
 * regardless of mouse focus
 * @property {string} lineEmphasized Classes to add to lines that are always emphasized,
 * regardless of mouse focus
 * @property {string} dot The dot that indicates the point on the line where the user is
 * focused
 * @property {string} axis Both the X and Y axis group
 * @property {string} xAxis The SVG group that holds the x-Axis elements
 * @property {string} yAxis The SVG group that holds the y-Axis elements
 * @property {string} yAxisLabel Text that labels the y-Axis
 */

/**
 * Time series data
 * @typedef {Object} TimeSeriesData
 * @property {string} y A label for the y Axis
 * @property {Date[]} dates An array of date objects to use for the x-axis and x values
 * @property {TimeSeriesDatum[]} series An array of lines to draw on the plot. Each line
 * has an ID, name (label), and an array of y values the same length as the dates
 * property.
 */

/**
 * Time series datum
 * @typedef {Object} TimeSeriesDatum
 * @property {string} id An ID for the path
 * @property {string} name A label to show for the path
 * @property {number[]} values An array of values. The length of this array should be the
 * same as the length of TimeSeriesData.dates
 */

/**
 * Creates a time series
 * @param {Object} options - The configuration for the region time series plot
 * @property {HTMLElement} container - The element in which the region time series plot
 * should be rendered
 * @property {TimeSeriesData} [data] - Time series data to use to create the plot. Can
 * later be updated with the update function.
 * @property {number} [height] - The height of the SVG viewbox in pixels
 * @property {number} [width] - The width of the SVG viewbox in pixels
 * @property {number} [transitionDuration] - How long should transitions take, in MS, when
 * updating data
 * @property {number} [yMin] - The minimum number to show on the y-Axis regardless of the
 * values in the data. If not set, the min from the data will be used.
 * @property {number} [yMax] - The maximum number to show on the y-Axis regardless of the
 * values in the data. If not set, the max from the data will be used.
 * @property {string} [timeFormat] - The format to use when display time (x) values. Used
 * for both the x-axis and tooltip.
 * @property {function} [colorFunction] - Optional. A function that takes a datum's value
 * and returns a color. This will be used to color the value shown in the tooltip.
 * @property {string[]} highlightLines - A list of IDs that correspond to lines that
 * should always be highlighted/focused, regardless of mouse activity.
 * @property {string[]} emphasizeLines - A list of lines that should always have emphasis,
 * regardless of mouse activity. These lines should stand out, but not as much as the
 * 'highLight' lines, above.
 * @property {Margin} [margin] - The margin around the plot
 * @property {TimeSeriesClasses} [classes] - The classes to use for elements in this plot
 * @returns {Object} returns an object with functions that can be used to interact with
 * the plot.
 */
function timeSeries({
  container,
  data,
  width = 600,
  height = 400,
  transitionDuration = 1000,
  yMin,
  yMax,
  timeFormat = '%Y',
  colorFunction = null,
  highlightLines = [],
  emphasizeLines = [],
  margin = { top: 20, right: 20, bottom: 30, left: 30 },
  classes = {
    timeSeries: 'time-series',
    plot: 'time-series__plot',
    line: 'time-series__line',
    lineBackground: 'time-series__line--subtle',
    lineFocused: 'time-series__line--focus',
    lineHighlighted: 'time-series__line--highlight',
    lineEmphasized: 'time-series__line--emphasize',
    dot: 'time-series__dot',
    axis: 'time-series__axis',
    xAxis: 'time-series__x-axis',
    yAxis: 'time-series__y-axis',
    yAxisLabel: 'time-series__y-label'
  },
} = {}) {

  if (!container) {
    console.log('A container is required to render the line graph.')
    return;
  }
  if (!data) {
    console.log('Data is required to render line graph.')
    return;
  }

  // Create an SVG to hold the line graph and render it in the container
  const svg = d3.select(container)
    .classed(classes.timeSeries, true) // Ensure the container has the main class
    .append('svg')
    .classed(classes.plot, true) // Add the plot class to the SVG element
    .attr('preserveAspectRatio', 'xMidYMid')
    .attr('viewBox', [0, 0, width, height])

  // Initialize the x axis
  const x = d3.scaleUtc()
    .range([margin.left, width - margin.right])

  let xAxis = d3.axisBottom()
    .scale(x)
    .ticks(width / 80)
    .tickSizeOuter(0)
    .tickFormat(d3.timeFormat(timeFormat));

  svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .attr('class', classes.xAxis + ' ' + classes.axis)

  // Initialize the y axis
  const y = d3.scaleLinear()
    .range([height - margin.bottom, margin.top])

  let yAxis = d3.axisLeft().scale(y);

  const yAxisGroup = svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .attr('class', classes.yAxis + ' ' + classes.axis)
  
  // Create the y-axis label

  const yAxisLabel = yAxisGroup
    .append('g')
    .attr('transform', 'translate(' + -25 + ', ' + ((height/2) - 15) + ')')
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .attr('fill', 'currentColor')
    .attr('class', classes.yAxisLabel)
    .text(data.y)
  
  // Create the tooltips and other elements (e.g. the dot on the line) shown on hover
  const tooltip = regionTooltip({
    offsetY: -7,
    offsetX: 0
  });

  // The dot should be above all other elements
  const dot = svg.append('g')
    .attr('display', 'none');

  dot.append('circle')
    .attr('r', 2.5)
    .attr('class', classes.dot);

  // Create the time formatter (used to update the tooltip)
  const timeFormatter = d3.timeFormat(timeFormat)

  // A group for highlighted and emphasized lines. They should be above other paths.
  const specialPathGroup = svg.insert('g', ':first-child');

  // Add a group to hold all of the time series lines. They should be placed below the
  // axes and dot.
  const pathGroup = svg.insert('g', ':first-child');

  

  // Update with the initial data
  update(data)

  // Updates the plot when the data changes
  function update(newData) {

    // Replace the main timeSeries data variable with the new data
    data = newData

    // Function that will draw the paths based on the x and y properties
    let line = d3.line()
      .defined(d => !isNaN(d))
      .x((d, i) => x(data.dates[i]))
      .y(d => y(d))

    // Update the x-axis
    x.domain(d3.extent(data.dates))
    svg.selectAll('.' + classes.xAxis)
      .transition()
      .duration(transitionDuration)
      .call(xAxis);

    // Update the y-axis
    let yRange = [yMin, yMax];
    // Get the min and max from the data if these values are not configured
    if (!yMin && yMin !== 0) {
      yRange[0] = d3.min(data.series, d => d3.max(d.values))
    }
    if (!yMax && yMax !== 0) {
      yRange[1] = d3.max(data.series, d => d3.max(d.values))
    }

    y.domain(yRange).nice()
    svg.selectAll('.' + classes.yAxis)
      .transition()
      .duration(transitionDuration)
      .call(yAxis);

    // Bind data to the paths selection
    const paths = pathGroup
      .selectAll('.' + classes.line)
      .data(data.series)
    paths
      .enter()
      .append('path')
      .classed(classes.line, true)
      .classed(classes.lineHighlighted, d => highlightLines.includes(d.id))
      .classed(classes.lineEmphasized, d => emphasizeLines.includes(d.id))
      .merge(paths)
      .transition()
      .duration(transitionDuration)
      .attr('d', d => line(d.values))
    
    // Add hover effects
    svg
      .on('mousemove', moved)
      .on('mouseenter', entered)
      .on('mouseleave', left);

  }

  // When the mouse moves over the SVG
  function moved(event) {

    event.preventDefault();

    const pointer = d3.pointer(event, this);
    const xm = x.invert(pointer[0]);
    const ym = y.invert(pointer[1]);
    const i = d3.bisectCenter(data.dates, xm);
    const s = d3.least(data.series, d => Math.abs(d.values[i] - ym));
    // Get the x and y values of the closest hovered point
    const date = data.dates[i];
    const dateFormatted = timeFormatter(data.dates[i]);
    const value = s.values[i];
    // Set position of the dot
    const xTranslated = x(date);
    const yTranslated = y(value);
    // Set content for tooltip
    const color = colorFunction ? colorFunction(value) : 'grey'
    const title = s.name + ' (' + dateFormatted + ')';
    // Get position for the tooltip based on the placement of the dot
    const rectDims = dot.node().getBoundingClientRect()
    const xTool = rectDims.left;
    const yTool = rectDims.top + document.documentElement.scrollTop;

    // Re-position the dot
    dot.attr('transform', `translate(${xTranslated},${yTranslated})`);

    // Update the position and content of the tooltip
    tooltip.update(title, value, color)
    tooltip.reposition(xTool, yTool, true, true)

    // Make sure the highlighted and emphasized lines don't get covered by previously
    // hovered lines
    pathGroup
      .selectAll('.' + classes.lineHighlighted + ',.' + classes.lineEmphasized)
      .raise();
    
    // Highlight the hovered path
    pathGroup
      .selectAll('.' + classes.line)
      .classed(classes.lineFocused, d => d === s)
      .classed(classes.lineBackground, d => d !== s)
      .filter(d => d === s)
      .raise();
  }

  // When the mouse enters the SVG at all
  function entered() {
    dot.attr('display', null);
  }

  // When the mouse leaves the SVG
  function left() {
    svg
      .selectAll('.' + classes.line)
      .classed(classes.lineFocused, false)
      .classed(classes.lineBackground, false)
    dot.attr('display', 'none');
    tooltip.hide();
  }

  return Object.freeze({ update })
};

export default timeSeries