let d3 = window.d3;

/**
 * The classes to add to the various HTML elements that are combined to create an gauge
 * plot. The specific HTML elements are defined in the property definitions.
 * @typedef {Object} TimeSeriesClasses
 * @property {string} timeSeries The outer-most container element
 * @property {string} plot The SVG that holds the time series
 * @property {string} line Class for lines/paths in the time series
 * @property {string} xAxis The SVG group that holds the x-Axis elements
 * @property {string} yAxis The SVG group that holds the y-Axis elements
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
  margin = { top: 20, right: 20, bottom: 30, left: 30 },
  classes = {
    timeSeries: 'time-series',
    plot: 'time-series__plot',
    line: 'time-series__line',
    xAxis: 'time-series__x-axis',
    yAxis: 'time-series__y-axis',
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
  
  var xAxis = d3.axisBottom()
    .scale(x)
    .ticks(width / 80)
    .tickSizeOuter(0)

  svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .attr('class', classes.xAxis)
  
  // Initialize the y axis
  const y = d3.scaleLinear()
    .range([height - margin.bottom, margin.top])
  
  var yAxis = d3.axisLeft().scale(y);

  svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .attr('class', classes.yAxis)
  
  // Update with the initial data
  update(data)

  function update(newData) {

    data = newData

    var line = d3.line()
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
    const paths = svg
      .selectAll('.' + classes.line)
      .data(data.series)

    // Update the paths
    paths
      .enter()
      .append('path')
      .attr('class', classes.line)
      .merge(paths)
      .transition()
      .duration(transitionDuration)
      .attr('d', d => line(d.values))

    svg.call(hover, paths)
    
  }

  function hover(svg, path) {

    if ('ontouchstart' in document) svg
      .style('-webkit-tap-highlight-color', 'transparent')
      .on('touchmove', moved)
      .on('touchstart', entered)
      .on('touchend', left)
    else svg
      .on('mousemove', moved)
      .on('mouseenter', entered)
      .on('mouseleave', left);

    const dot = svg.append('g')
      .attr('display', 'none');

    dot.append('circle')
      .attr('r', 2.5);

    dot.append('text')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'middle')
      .attr('y', -8);

    function moved(event) {
      event.preventDefault();
      const pointer = d3.pointer(event, this);
      const xm = x.invert(pointer[0]);
      const ym = y.invert(pointer[1]);
      const i = d3.bisectCenter(data.dates, xm);
      const s = d3.least(data.series, d => Math.abs(d.values[i] - ym));
      path
        .attr('stroke', function (d) {
          if (d === s) {
            return 'black'
          } else {
            return '#ddd'
          }
        })
        .filter(d => d === s)
        .raise();
      dot.attr('transform', `translate(${x(data.dates[i])},${y(s.values[i])})`);
      dot.select('text').text(s.name);
    }

    function entered() {
      path.style('mix-blend-mode', null).attr('stroke', '#ddd');
      dot.attr('display', null);
    }

    function left() {
      path.style('mix-blend-mode', 'multiply').attr('stroke', 'null');
      dot.attr('display', 'none');
    }
  }
  
  return Object.freeze({ update })
};

export default timeSeries