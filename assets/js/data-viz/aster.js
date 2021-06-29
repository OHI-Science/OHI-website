const d3 = Object.assign(
  {},
  require("d3-selection"),
  require("d3-shape") // for d3.pie, d3.arc
);

/**
 * A single data point in an array of data that creates an aster plot. One data point
 * is represented by one arc or 'petal'.
 * @typedef {Object} AsterDataItem
 * @property {string} id - A unique identifier for the item
 * @property {string} label - The user-facing label that will be displayed in the legend
 * @property {number} score - The corresponding value for the item
 * @property {string} width - The relative width (~weight) of this item. Defaults to 1.
 * @property {string} color - The color that represents this value
 * @property {SVGElement} icon - An optional SVG icon to show in the legend
 */

/**
 * The classes to add to the various HTML elements that are combined to create an aster
 * plot. The specific HTML elements are defined in the property definitions.
 * @typedef {Object} AsterClasses
 * @property {string} aster - The container element that is passed to the aster function
 * @property {string} plot - The SVG element
 * @property {string} solidArc - The shaded arc path elements, i.e. 'petals'
 * @property {string} solidArcDimmed - Solid arcs that are not hovered or focused, when
 * another arc is hovered or focused
 * @property {string} outlineArc - The uniformly sized arcs that show the extent of the
 * plot
 * @property {string} meanScore - The svg text showing the mean score in the centre of the
 * plot
 * @property {string} list - The list of items that makes up the legend
 * @property {string} item - A single item in the legend
 * @property {string} itemDimmed - A legend item that is not hovered or focused when
 * another item is hovered or focused
 * @property {string} icon - The icons for each item in a legend
 */

/**
 * Creates an aster plot (aka flower plot)
 * @param {Object} options - The configuration for the aster plot
 * @property {HTMLElement} [container] - The element in which the aster plot should be
 * rendered
 * @property {AsterDataItem[]} [data] - The data to use to create the plot
 * @property {number} [meanScore] - The number to show in the middle of the aster plot
 * @property {boolean} [legend] -  Set to false to not render a legend
 * @property {number} [width] - The relative width of the plot, in pixels
 * @property {number} [height] - The relative height of the plot, in pixels
 * @property {number} [radius] - The maximum radius of the aster plot
 * @property {number} [innerRadius] - The radius of the inner circle that holds the mean
 * score value
 * @property {string} [missingValueCode] - The text to show in the middle of the aster
 * plot when a score/value is missing
 * @property {AsterClasses} [classes] - The classes to use for elements in this plot
 * @returns {Object} returns an object with functions that can be used to interact with
 * the plot.
 * @see {@link https://github.com/bbest/ohi-aster} by Ben Best for original aster plot code
 */
function aster({
  container,
  data,
  meanScore,
  legend = true,
  width = 500,
  height = 500,
  radius = Math.min(width, height) / 2,
  innerRadius = 0.3 * radius,
  missingValueCode = 'NA',
  classes = {
    aster: 'aster',
    plot: 'aster__plot',
    solidArc: 'aster__solid-arc',
    solidArcDimmed: 'aster__solid-arc--dimmed',
    outlineArc: 'aster__outline-arc',
    meanScore: 'aster__mean-score',
    list: 'aster__legend-list',
    item: 'aster__legend-item',
    itemDimmed: 'aster__legend-item--dimmed',
    icon: 'aster__legend-icon'
  },
} = {}) {

  if (!container) {
    console.log('A container is required to render the aster plot.')
    return;
  }
  if (!data) {
    console.log('Data is required to render the aster plot.');
    return
  }

  // A function that takes data and calculates the values required to draw wedges/arcs
  const pie = d3.pie()
    .sort(null)
    .value(function (d) {
      return d.width || d.width === 0 ? d.width : 1;
    });

  // Creates a path based on pie data
  const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(function (d) {
      return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius;
    });

  const outlineArc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(radius);

  // Create an SVG to hold the aster plot and render it in the container
  const svg = d3.select(container)
    .classed(classes.aster, true) // Ensure the container has the aster class
    .append('svg')
    .classed(classes.plot, true) // Add the plot class to the SVG element
    .attr('preserveAspectRatio', 'xMidYMid')
    .attr('viewBox', [0, 0, width, height])

  // The group will hold all the plot elements
  const group = svg.append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
  
  // Save references to elements that will be modified so that they are accessible outside
  // of the functions that create them.

  // paths that create the 'petals' or shaded arcs
  let arcs = null
  // Will hold the paths that create the arc outlines
  let outerPath = null
  // Will hold the list of legend items
  let legendList = null
  // Will hold the legend items
  let legendItems = null
  // The number in the middle of the aster plot
  let middleText = null

  // Create the plot & legend
  updateData(data, meanScore)

  // Give aster data and a mean score, draw or re-draw the aster plot
  function updateData(newData, newMeanScore) {

    // Update the data and mean score globally
    data = newData
    meanScore = newMeanScore

    const pieData = pie(data);

    arcs = group.selectAll('.' + classes.solidArc)
      .data(pieData)
      .join('path')
      .attr('d', arc)
      .attr('fill', function (d) { return d.data.color; })
      .attr('class', classes.solidArc)
      .on('mouseover', highlightCategory)
      .on('mouseout', resetHighlight)

    outerPath = group.selectAll('.' + classes.outlineArc)
      .data(pieData)
      .join('path')
      .attr('d', outlineArc)
      .attr('fill', 'none')
      .attr('class', classes.outlineArc)
      
    // calculate the weighted mean score
    // var score =
    //   data.reduce(function (a, b) {
    //     console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
    //     return a + (b.score * b.weight);
    //   }, 0) /
    //   data.reduce(function (a, b) {
    //     return a + b.weight;
    //   }, 0);
    
    if (meanScore || meanScore === 0) {
      updateScore(meanScore)
    }
    // Create a legend, if configured
    if (legend) {
      createLegend(data)
    }
  }

  function updateScore(score, color) {
    if (typeof score == 'number') {
      score = Math.round(score)
    }
    middleText = group.selectAll('.' + classes.meanScore)
      .data([score])
      .join('svg:text')
      .text(d => d)
      .attr('class', classes.meanScore)
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
    if (color) {
      middleText.attr('fill', color)
    } else {
      middleText.attr('fill', 'currentColor')
    }
  }

  // Function called when user hovers over an arc
  function highlightCategory(event, hoveredDatum) {
    hoveredDatum = hoveredDatum.data || hoveredDatum
    let score = hoveredDatum.score;
    if (score || score === 0) {
      updateScore(score, hoveredDatum.color)
    } else {
      updateScore(missingValueCode)
    }
    function IDMismatched(d) {
      return hoveredDatum.id !== (d.id || d.data.id)
    }
    arcs.classed(classes.solidArcDimmed, IDMismatched)
    legendItems.classed(classes.itemDimmed, IDMismatched)
  }

  // Function that restores the plot to the state before a user hovered over an arc
  function resetHighlight(event, hoveredDatum) {
    arcs.classed(classes.solidArcDimmed, false)
    legendItems.classed(classes.itemDimmed, false)
    if (meanScore || meanScore === 0) {
      updateScore(meanScore)
    } else {
      updateScore(null)
    }
  }

  // Creates the categorical legend 
  function createLegend(data) {
    
    if (!legendList) {
      legendList = d3.select(container)
        .append('ul')
        .attr('class', classes.list);
    }

    legendItems = legendList.selectAll('.' + classes.item)
      .data(data)
      .join('li')
      .attr('class', classes.item)
      .html(createLegendItem)
      .style('color', d => d.color)
      .on('mouseover', highlightCategory)
      .on('mouseout', resetHighlight)
  }

  // Creates the inner HTML of a single item within the legend
  function createLegendItem(goal) {

    const item = document.createElement('div')

    if (goal.icon) {
      const icon = goal.icon.cloneNode(true)
      icon.classList = classes.icon
      item.append(icon)
    }

    const label = document.createElement('span')
    label.innerText = goal.label
    
    item.append(label)

    return item.innerHTML
  }

  return Object.freeze({
    updateData
  })
};

export default aster