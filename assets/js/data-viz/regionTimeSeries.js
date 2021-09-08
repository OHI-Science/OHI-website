import getData from "./data.js"
import timeSeries from "./timeSeries.js"
import dropdown from "./dropdown.js"

/**
 * The classes to add to the various HTML elements that are combined to create an gauge
 * plot. The specific HTML elements are defined in the property definitions.
 * @typedef {Object} RegionTimeSeriesClasses
 * @property {string} regionTimeSeries - The container element that is passed to the time
 * series function
 * @property {string} controls - The class for the element that will hold any controls,
 * like the goal dropdown input
 * @property {string} control - A single control element
 *  @property {string} label - The label for a control element
 */

/**
 * Creates a time series 
 * @param {Object} options - The configuration for the region time series plot
 * @property {HTMLElement} container - The element in which the region time series plot
 * should be rendered
 * @property {string} [regionId] - The ID for the region to highlight in the time series
 * plot. If none is specified, then no region will be highlighted.
 * @property {string} [goalCode] - The ID/code for the goal to initially show on the plot.
 * If none is specified, then the Overall Index is shown first.
 * @property {RegionTimeSeriesClasses} [classes] - The classes to use for elements in
 * this plot
 * @returns {Object} returns an object with functions that can be used to interact with
 * the plot.
 */
async function regionTimeSeries({
  container,
  regionId,
  goalCode,
  classes = {
    regionTimeSeries: "region-time-series",
    controls: "region-time-series__controls",
    control: "region-time-series__control",
    label: "region-time-series__label"
  }
} = {}) {

  if (!container) {
    console.log("A container is required to render the region time series visualization");
    return
  }

  // Default to the overall goal index
  if (!goalCode) {
    goalCode = 'Index'
  }

  // Ensure the container has the main class
  container.classList.add(classes.regionTimeSeries)

  // Import and process the scores & features data
  const ohiData = await getData();

  // Format data for the plot
  var data = {
    y: 'Score',
    series: [],
    dates: []
  }
  var dateParser = d3.utcParse('%Y')
  var scoreData = ohiData.scores.score

  // Years stay consistent
  ohiData.years.forEach(year => {
    data.dates.push(dateParser(year))
  });

  createControls()
  data = updateTimeSeriesData(regionId, goalCode)

  const plot = timeSeries({
    container: container,
    data: data,
    yMin: 0,
    yMax: 100
  })
  function updateTimeSeriesData(regionId, goalCode) {

    // Empty the current series
    data.series = []

    for (const [regionId, label] of Object.entries(ohiData.regionLabels)) {
      var regionData = {
        values: [],
        name: label,
        id: regionId
      }
      ohiData.years.forEach(year => {
        var regionScore = scoreData[year][goalCode][regionId]
        regionData.values.push(regionScore)
      });
      data.series.push(regionData)
    }

    return data
  }

  function createControls() {

    // Create a container for any inputs (the goal input)
    const controls = document.createElement('div');
    controls.classList.add(classes.controls);
    container.append(controls);
    
    // Create the dropdown to switch between goals
    const goalControl = document.createElement("div");
    goalControl.classList = classes.control;

    const goalLabel = document.createElement("span");
    goalLabel.classList = classes.label;
    goalLabel.innerText = "Goal";

    goalControl.appendChild(goalLabel);
    controls.append(goalControl);
    
    // Create the goals input
    const goalsInput = dropdown({
      data: ohiData.goalsConfig,
      selected: goalCode
    })

    goalsInput.addEventListener('update', function (e) {
      newGoalCode = e.detail.id
      data = updateTimeSeriesData(regionId, newGoalCode)
      plot.update(data)
      
    })

    goalControl.appendChild(goalsInput);

  }

  return plot

};

export default regionTimeSeries