let d3 = window.d3;

import baseTooltip from './tooltip.js'

/**
 * A single label to display along the outside of the gauge at a particular value
 * @typedef {Object} GaugeTicks
 * @property {string} value The value at which to place the tick
 * @property {string} label The label to show when the value is hovered over
 */

/**
 * The classes to add to the various HTML elements that are combined to create an gauge
 * plot. The specific HTML elements are defined in the property definitions.
 * @typedef {Object} GaugeClasses
 * @property {string} gauge - The container element that is passed to the gauge function
 * @property {string} plot - The SVG element
 * @property {string} needle - The pointer that indicates the given metric
 *  @property {string} metric - The text that displays the metric
 */

/**
 * Creates an gauge plot
 * @param {Object} options - The configuration for the gauge plot
 * @property {HTMLElement} container - The element in which the gauge plot should be
 * rendered
 * @property {number} [metric] The key value that the gauge should point to. This number
 * must be between the min and max.
 * @property {number} [min] The minimum possible value on the scale that the gauge
 * represents
 * @property {number} [max] The maximum possible value on the scale that the gauge
 * represents
 * @property {number} [margin] The margin around the plot (same on all four sides)
 * @property {number} [tickWidth] The width of the ticks on the gauge's arc that shows any
 * values set in the ticks property
 * @property {number} [needleSize] The width of the gauge's needle
 * @property {number} [transitionTime] The maximum time it takes for the needle to move
 * from the minimum to the metric value when the figure is first initialized (this will be
 * scaled to the value relative to the max)
 * @property {number} [width] - The relative width of the plot, in pixels
 * @property {number} [height] - The relative height of the plot, in pixels
 * @property {string} [numberFormat] - A number format string to use with d3.format. See
 * https://github.com/d3/d3-format. This is used when tweening the displayed value on
 * update.
 * @property {function} [colorScale] - A function that receives a metric value, for any
 * number between the min and max, and returns a color. Used to draw the shaded arc. For
 * example, a D3 color scale function.
 * @property {number} [nColor] The number of 'slices' to draw - slices make up the arc.
 * Each slice has it's own fill colour. The higher n, the smoother the gradient of the arc
 * appears.
 * @property {GaugeTicks[]} ticks Extra markers to label on the gauge, other than the
 * minimum and maximum
 * @property {GaugeClasses} [classes] - The classes to use for elements in this plot
 * @returns {Object} returns an object with functions that can be used to interact with
 * the plot.
 */
function gauge({
  container,
  metric = 0,
  min = 0,
  max = 1,
  width = 400,
  height = 250,
  margin = 0,
  tickWidth = 0.3,
  needleSize = 10,
  transitionTime = 4000,
  numberFormat = '.0f',
  colorScale = d3.scaleSequential(d3.interpolateRdYlGn),
  nColor = 100,
  ticks = [],
  classes = {
    gauge: 'gauge',
    plot: 'gauge__plot',
    needle: 'gauge__needle',
    metric: 'gauge__metric',
    tick: 'gauge__tick',
    tickLabel: 'gauge__tick-label'
  },
} = {}) {

  if (!container) {
    console.log('A container is required to render the gauge plot.')
    return;
  }

  // Set dimensions to use in the visualization. Some calculated from the configured
  // height and width.
  const smallestDimension = Math.min(height, width)
  const largestDimension = Math.max(height, width)
  const aspectRatio = largestDimension / smallestDimension
  const radius = (smallestDimension - (margin * 2)) * (1 / aspectRatio)
  const innerRadius = radius - (radius / 6)
  const needleOffsetInner = (radius - innerRadius) * -1.33;
  const needleOffsetOuter = (innerRadius) * -1;
  const tickLabelOffset = 5;
  const arcRatio = 0.55;
  const pi = Math.PI;
  const halfPi = pi / 2;
  const endAngle = pi * arcRatio
  const startAngle = -endAngle;

  // Create the 'data' that draws the arc
  const data = d3.range(startAngle, endAngle, pi / nColor);
  const _data = data.slice(0);

  // Translates a value to display on the gauge to the angle/position on the arc
  const scale = d3
    .scaleLinear()
    .domain([min, max])
    .range([startAngle, endAngle]);
  
  // Translates a value within the min and max to a percentage of the possible max
  const percentScale = d3
    .scaleLinear()
    .domain([min, max])
    .range([0, 1]);
  
  // Make the transition time faster for metric values that are closer to the minimum
  transitionTime = percentScale(metric) * transitionTime;

  // Given whatever color scale is provided, update the domain to the arc of the gauge
  const numColors = colorScale.range().length
  const difference = endAngle - startAngle
  const colStep = difference / (numColors - 1)
  const arcRange = d3.range(startAngle, endAngle + (pi / numColors), colStep);
  colorScale.domain(arcRange)

  // Create an SVG to hold the line graph and render it in the container
  const svg = d3.select(container)
    .classed(classes.gauge, true) // Ensure the container has the main class
    .append('svg')
    .classed(classes.plot, true)
    .attr('preserveAspectRatio', 'xMidYMid')
    .attr('viewBox', [0, 0, width, height])
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + (0.75 * height) + ')');

  // Draw the arc from start angle to end angle
  _data.push(endAngle);
  const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(radius)
    .startAngle(function (d) { return d; })
    .endAngle(function (d, i) { return _data[i + 1]; });
  
  const sliceContainer = svg
    .append('g')

  const slice = sliceContainer
    .selectAll('path')
    .data(data);
  
  slice
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function (d) { return colorScale(d); });
  
  // Calculate font size for the main metric
  const fontSize = (sliceContainer.node().getBBox().height - (radius - innerRadius)) / 2
  // Font size for the max and min labels, and any other ticks on the arc
  const fontSizeTicks = fontSize / 5
  
  // Create the marker ticks & text to show on the arc
  if (!ticks) {
    ticks = []
  }

  // Create the tooltip elements that will be used along with the tick labels
  const tooltip = baseTooltip({
    offsetY: 0,
    offsetX: 0
  });

  // Show the minimum and maximum
  ticks.push(
    {
      value: min,
      label: 'Minimum'
    },
    {
      value: max,
      label: 'Maximum'
    }
  )

  const markerText = svg
    .append('g')
    .selectAll('text')
    .data(ticks);
  
  // Insert the marker text
  markerText
    .enter()
    .append('text')
    .attr('class', classes.tickLabel)
    .text(function (d) {
      return d3.format(numberFormat)(d.value)
    })
    .style('font-size', fontSizeTicks + 'px')
    .attr('text-anchor', function (d) {
      // Text anchor needs to change depending how far along the arc the value is placed
      const percentValue = percentScale(d.value);
      if (percentValue < 0.34) { return 'end' }
      if (percentValue > 0.67) { return 'start' }
      return 'middle'
    })
    .attr('transform', function (d) {
      return transformTween(scale(d.value), tickLabelOffset)({ oldValue: scale(min) })(1);
    })
    .on('mouseover', function (event, d) {
      // Update the position and text of the tooltip
      tooltip.update(d.label)
      const rectDims = this.getBoundingClientRect()
      const x = rectDims.left;
      const y = rectDims.top + document.documentElement.scrollTop;
      tooltip.reposition(x, y, true, true)
    })
    .on('mouseout', tooltip.hide);
  
  // Insert the marker ticks 
  const markerTicks = svg
    .append('g')
    .selectAll('path')
    .data(ticks);
  
  const tickArc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(radius)
    .startAngle(function (d) {
      return scale(d.value - (tickWidth / 2))
    })
    .endAngle(function (d) {
      return scale(d.value + (tickWidth / 2))
    })
  
  markerTicks
    .enter()
    .append('path')
    .attr('d', tickArc)
    .attr('class', classes.tick);
  
  // Create the path that will become the needle
  const needle = svg
    .append('g')
    .append('path')
    .attr('class', classes.needle);

  // Create the text that holds the main metric
  const text = svg.append('g')
    .append('text')
    .attr('class', classes.metric)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'text-bottom')
    .text(min)
    .style('font-size', fontSize + 'px')
    .attr('dy', (fontSize * -0.05) + 'px');
  
  // Moves the needle and updates the metric text
  function update(oldValue, newValue) {

    needle
      .datum({ oldValue: oldValue })
      .transition().duration(transitionTime)
      .attrTween('d', lineTween(newValue))
      .attrTween('transform', transformTween(newValue, needleOffsetInner))
      .on('end', function () {
        // what to do when the needle stops moving
      });

    text
      .datum({ oldValue: oldValue })
      .transition().duration(transitionTime)
      .tween('text', textTween(newValue))
  }

  // Function used to transition the value of the text from initial value to the final
  // value
  function textTween(newValue) {
    return function (d) {

      const that = d3.select(this),
        i = d3.interpolate(d.oldValue, newValue);

      return function (t) {
        that.text(d3.format(numberFormat)(scale.invert(i(t))));
      };
    };
  }

  // Returns a transform function to place objects along the arc of the gauge
  function transformTween(newValue, offset) {
    return function (d) {

      if (!offset) {
        offset = 0
      }

      const interpolate = d3.interpolate(d.oldValue, newValue);

      return function (t) {
        const _in = interpolate(t) - halfPi,
          centerX = (radius + offset) * Math.cos(_in),
          centerY = (radius + offset) * Math.sin(_in);
        
        return 'translate(' + centerX + ',' + centerY + ')';
      };
    };
  }

  // The function used to draw the needle at the correct angle according to where it's
  // pointing on the arc
  function lineTween(newValue) {
    return function (d) {

      const interpolate = d3.interpolate(d.oldValue, newValue);

      return function (t) {

        const _in = interpolate(t) - halfPi,
          _im = _in - halfPi,
          _ip = _in + halfPi;

        const topX = (radius + needleOffsetOuter) * Math.cos(_in),
          topY = (radius + needleOffsetOuter) * Math.sin(_in);

        const leftX = needleSize * Math.cos(_im),
          leftY = needleSize * Math.sin(_im);

        const rightX = needleSize * Math.cos(_ip),
          rightY = needleSize * Math.sin(_ip);

        return d3.line()([[topX, topY], [leftX, leftY], [rightX, rightY]]) + 'Z';
      };
    };
  }

  // Start the visualization by moving the needle from the minimum value to the value we
  // want it to point at
  update(scale(min), scale(metric));
  
  return Object.freeze({ update })
};

export default gauge