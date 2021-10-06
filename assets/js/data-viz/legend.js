let d3 = window.d3;

// if (!d3) {
//   d3 = Object.assign(
//     {},
//     require('d3-selection'),
//     require('d3-interpolate'),
//     require('d3-scale'),
//     require('d3-axis')
//   );
// }

/**
 * @param {Object} options - Configurable options for the legend. All dimensions are in pixels.
 * @property {Function} color - A D3 color scale function
 * @property {string} [title] - The title to display above the legend
 * @property {number} [tickSize = 6] - The height of the tick marks below the legend
 * @property {number} [width = 320] - The width of the legend
 * @property {number} [height = 44 + tickSize] - Total height of the legend
 * @property {number} [marginTop = 18] - Margin at the top
 * @property {number} [marginRight = 0] - Margin to the right
 * @property {number} [marginBottom = 16 + tickSize] - Margin at the bottom
 * @property {number} [marginLeft = 0] - Margin to the left
 * @property {number} [ticks = width / 64] - The number of ticks to display
 * @property {Function} [tickFormat] - A d3 number formatting function
 * @property {number} [Number[]] - Specific values to indicate on the legend
 * @property {string} [titleClass = title] - The class to add to the legend's title element
 * @returns {SVGElement} - Returns the legend in a self-contained SVG
 * @see {@link https://observablehq.com/@d3/color-legend}
 */
function legend({
  color,
  title,
  tickSize = 6,
  width = 350,
  height = 44 + tickSize,
  marginTop = 18,
  marginRight = 0,
  marginBottom = 16 + tickSize,
  marginLeft = 0,
  ticks = width / 64,
  tickFormat,
  tickValues,
  titleClass = 'title'
} = {}) {

  if (!color) {
    console.log('A color (D3 color scale function) is required to create a legend')
    return
  }


  let sizeNoData = 0;
  // Make room for the No Data legend element, if there is one
  if (color(null)) {
    sizeNoData = (height - marginTop - marginBottom)
    marginLeft = marginLeft + (sizeNoData * 1.9) // times 1.9 for padding
  }

  function ramp(color, n = 256) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    d3.select(canvas)
      .attr('width', n)
      .attr('height', 1);
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
  }

  const svg = d3.create('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .style('overflow', 'visible')
    .style('display', 'block');

  let tickAdjust = g => g.selectAll('.tick line').attr('y1', marginTop + marginBottom - height);
  let x;

  // Continuous
  if (color.interpolate) {
    const n = Math.min(color.domain().length, color.range().length);

    x = color.copy().rangeRound(d3.quantize(d3.interpolate(marginLeft, width - marginRight), n));

    svg.append('image')
      .attr('x', marginLeft)
      .attr('y', marginTop)
      .attr('width', width - marginLeft - marginRight)
      .attr('height', height - marginTop - marginBottom)
      .attr('preserveAspectRatio', 'none')
      .attr('xlink:href', ramp(color.copy().domain(d3.quantize(d3.interpolate(0, 1), n))).toDataURL());
  }

  // Sequential
  else if (color.interpolator) {
    x = Object.assign(color.copy()
      .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
      { range() { return [marginLeft, width - marginRight]; } });

    svg.append('image')
      .attr('x', marginLeft)
      .attr('y', marginTop)
      .attr('width', width - marginLeft - marginRight)
      .attr('height', height - marginTop - marginBottom)
      .attr('preserveAspectRatio', 'none')
      .attr('xlink:href', ramp(color.interpolator()).toDataURL());

    // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
    if (!x.ticks) {
      if (tickValues === undefined) {
        const n = Math.round(ticks + 1);
        tickValues = d3.range(n).map(i => d3.quantile(color.domain(), i / (n - 1)));
      }
      if (typeof tickFormat !== 'function') {
        tickFormat = d3.format(tickFormat === undefined ? ',f' : tickFormat);
      }
    }
  }

  // Threshold
  else if (color.invertExtent) {
    const thresholds
      = color.thresholds ? color.thresholds() // scaleQuantize
        : color.quantiles ? color.quantiles() // scaleQuantile
          : color.domain(); // scaleThreshold

    const thresholdFormat
      = tickFormat === undefined ? d => d
        : typeof tickFormat === 'string' ? d3.format(tickFormat)
          : tickFormat;

    x = d3.scaleLinear()
      .domain([-1, color.range().length - 1])
      .rangeRound([marginLeft, width - marginRight]);

    svg.append('g')
      .selectAll('rect')
      .data(color.range())
      .join('rect')
      .attr('x', (d, i) => x(i - 1))
      .attr('y', marginTop)
      .attr('width', (d, i) => x(i) - x(i - 1))
      .attr('height', height - marginTop - marginBottom)
      .attr('fill', d => d);

    tickValues = d3.range(thresholds.length);
    tickFormat = i => thresholdFormat(thresholds[i], i);
  }

  // Ordinal
  else {
    x = d3.scaleBand()
      .domain(color.domain())
      .rangeRound([marginLeft, width - marginRight]);

    svg.append('g')
      .selectAll('rect')
      .data(color.domain())
      .join('rect')
      .attr('x', x)
      .attr('y', marginTop)
      .attr('width', Math.max(0, x.bandwidth() - 1))
      .attr('height', height - marginTop - marginBottom)
      .attr('fill', color);

    tickAdjust = () => { };
  }

  svg.append('g')
    .attr('transform', `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x)
      .ticks(ticks, typeof tickFormat === 'string' ? tickFormat : undefined)
      .tickFormat(typeof tickFormat === 'function' ? tickFormat : undefined)
      .tickSize(tickSize)
      .tickValues(tickValues))
    .call(tickAdjust)
    .call(g => g.select('.domain').remove())
    .call(g => g.append('text')
      .attr('x', marginLeft)
      .attr('y', marginTop + marginBottom - height - 18)
      .attr('fill', 'currentColor')
      .attr('text-anchor', 'start')
      .attr('class', titleClass)
      .text(title));
  
  // If there is an no data color
  if (color(null)) {

    const noDataFontSize = 11;
    const noData = svg.append('g')
      .attr('transform', `translate(${sizeNoData * 0.5},${marginTop})`)
    
    noData.append('rect')
      .attr('width', sizeNoData)
      .attr('height', sizeNoData)
      .attr('stroke', 'none')
      .attr('transform', `translate(${-0.5 * sizeNoData},0)`)
      .attr('fill', color(null));
    noData.append('text')
      .text('No')
      .attr('fill', 'currentColor')
      .attr('dy', `${sizeNoData + noDataFontSize}px`)
      .style('font-size', `${noDataFontSize}px`)
      .attr('text-anchor', 'middle')
    noData.append('text')
      .text('data')
      .attr('fill', 'currentColor')
      .attr('dy', `${sizeNoData + noDataFontSize + noDataFontSize}px`)
      .style('font-size', `${noDataFontSize}px`)
      .attr('text-anchor', 'middle')

  }
  
    
  return svg.node();
}

export default legend