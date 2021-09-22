import getData from './data.js'
import gauge from './gauge.js'
import colorScale from './colorScale.js'

/**
 * Creates an gauge that indicates the score for a given OHI region, goal, and year
 * @param {Object} options - The configuration for the scoreGauge plot
 * @property {HTMLElement} container - The element in which the scoreGauge plot should be
 * rendered
 * @property {string} regionId The ID of the region to show the score for
 * @property {number} year The year to show the score for
 * @property {string} goalCode The code for the goal that the gauge should show a score
 * for
 */
async function scoreGauge({
  container,
  regionId = null,
  year = null,
  goalCode = 'Index',
} = {}) {

  if (!container) {
    console.log('A container is required to render the scoreGauge plot.')
    return
  }

  if (!goalCode) {
    console.log('A goal code is required to render a score gauge.');
    return
  }

  if (!regionId) {
    console.log('A region ID is required to render a score gauge.');
    return
  }

  // Import and process the scores & features data
  const ohiData = await getData();

  // If year is set to null, then use the current year
  if (!year) {
    year = Math.max(...ohiData.years);
  }

  const regionScore = ohiData.scores.score[year][goalCode][regionId];
  const globalScore = ohiData.scores.score[year][goalCode][0];

  gauge({
    container: container,
    metric: regionScore,
    min: 0,
    max: 100,
    colorScale: colorScale.getColorFunction(),
    ticks: [
      {
        value: globalScore,
        label: 'Global average'
      }
    ]
  })
  
  return Object.freeze({})
};

export default scoreGauge