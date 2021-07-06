let d3 = window.d3;

// if (!d3) {
//   d3 = Object.assign(
//     {},
//     require("d3-scale"),
//     require("d3-array"),
//   );
// }

import legend from "./legend.js"

/**
 * The colour palette used throughout the OHI data visualizations
 * @returns {Object} An object with functions for getting a color based on score, or an
 * SVG legend
 */

// The colours to use in the colour palette. We want ~75% of the colours to be reds -
// yellows, since those represent 'bad' scores. The top 25% should be blues to show
// 'good' scores.
const reds = [
  '#8a0032', '#A50026', '#A50026', '#D73027', '#F46D43', '#FDAE61', '#FEE090', '#FEE090'
]
const blues = ['#ABD9E9', '#4575B4', '#313695']
const redAndBlues = reds.concat(blues)
const missingValueColour = '#9CA3AF';

// The min and max OHI score, used to calculate the step between each colour in the
// palette.
const minScore = 0;
const maxScore = 100;
const rangeScore = maxScore - minScore;
const numSteps = redAndBlues.length - 1;
const step = rangeScore / numSteps;

// A function that, given an OHI score, will give the colour from our continuous colour
// scale palette.
const getLegendColor = d3.scaleLinear()
  .domain(d3.range(minScore, (maxScore + step), step))
  .range(redAndBlues)
  .unknown(missingValueColour);

// Create the legend
const getLegend = function (titleClass = "title") {
  return legend({
    color: getLegendColor,
    title: 'Ocean Health Index Score',
    tickSize: 2,
    width: 330,
    height: 50,
    titleClass: titleClass
  })
}

export default Object.freeze({ getLegend, getLegendColor })