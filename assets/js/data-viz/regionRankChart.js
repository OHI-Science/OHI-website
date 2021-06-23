import getData from "./data.js"
import barChart from "./barChart.js"
import colorScale from "./colorScale.js"

/**
 * The classes to add to the various HTML elements that are combined to create a region
 * rank chart. The specific HTML elements are defined in the property definitions.
 * @typedef {Object} RegionRankChartClasses
 * @property {string} regionRankChart - The entire container
 */

/**
 * Creates a bar chart that shows the relative rank of a given region for a set of scores.
 * @param {Object} options - Configurable options for the rank chart
 * @property {HTMLElement} container - The container into which the rank chart should be
 * inserted
 * @property {string} regionId - The ID of the region to display
 * @property {RegionRankChartClasses} [classes] - Classes to add to the HTML elements
 * created by this function
 */
async function regionRankChart({
  container = null,
  regionId = null,
  classes = {
    regionRankChart: "region-rank-chart",
  }
} = {}) {

  if (!container) {
    console.log("A container is required to render the region rank chart visualization");
    return
  }
  if (!regionId) {
    console.log("A region ID must be set when creating a region rank chart visualization");
    return
  }

  // Ensure the container has the main class
  container.classList.add(classes.regionRankChart)

  // Import and process the scores & features data
  const ohiData = await getData();

  // Get the min and max years available from the data
  const maxYear = Math.max(...ohiData.years);
  const minYear = Math.min(...ohiData.years);

  // The initially selected data (some of this can be changed by user, e.g. date)
  const selections = {
    year: maxYear.toString(),
    dimension: 'score',
    region: regionId,
    goal: 'Index'
  }

  const barChartData = getBarChartData();

  function getBarChartData() {
    // Prepare the data for the aster plot
    const yearDimensionData = ohiData.scores[selections.dimension][selections.year][selections.goal]
    let barChartData = []
    for (const [regionId, score] of Object.entries(yearDimensionData)) {
      barChartData.push({
        id: regionId,
        label: ohiData.regionLabels[regionId],
        value: score
      })
    }
    // sort by value
    barChartData.sort(function (a, b) {
      return b.value - a.value;
    });
    return barChartData
  }

  const rankChart = barChart({
    container: container,
    data: barChartData,
    colorFunction: colorScale.getLegendColor
  })

  rankChart.focusBar(regionId)

  return rankChart

};

export default regionRankChart