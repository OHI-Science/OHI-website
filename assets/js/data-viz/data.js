// D3 modules
const d3 = Object.assign(
  {},
  require("d3-fetch")
);

// For processing topojson
import * as topojson from "topojson-client";
// Parameters imported from the baseof.html template which builds the JS
import params from '@params'

let dataBundleConfig = {};
if (params.dataConfig) {
  dataBundleConfig = JSON.parse(params.dataConfig)
}

/**
 * Loads and processes OHI Data.
 * @param {Object} options
 * @property {string} [options.dataPaths.scores] The path to the CSV file that comprises
 * the complete scores data
 * @property {string} [options.dataPaths.regions] The path to the topoJSON file that has
 * ocean, land, and eez feature information
 * @property {string} [options.goalsConfig] JSON that comprises the array of OHI goals, in
    the order to be displayed in the UI. Each goal in the array is an Object that
    comprises the id (e.g. 'AO'), label (e.g. 'Artisanal Fishing Opportunities'), SVG
    icon, and, if it is a sub-goal, the parent ID. Sub-goals do not need icons, they can
    use the parent icon. Icons *must* be SVG content embedded into the JSON.
 * @property {string} [options.missingValueCode] The string that is used in the scores CSV
 * that indicates a value is missing.
 *
 * @returns {Object} - returns an Object with all of the OHI data, formatted for use in
 * the various OHI data viz applications
 */
function data({
  missingValueCode = 'NA',
  dataPaths = {
    scores: 'scores.csv',
    regions: 'regions.topojson',
  },
  goalsConfig = {}
} = dataBundleConfig) {

  if (!dataPaths || !dataPaths.scores || !dataPaths.regions) {
    console.log('Error: Path to data is required for OHIData to load data.');
    return
  }

  // Fetch and return JSON data given a path or URL
  async function importJSON(path) {
    let response = await fetch(path)
    let data = await response.json()
    return data;
  }

  // Fetch and return CSV data given a path or URL
  async function importCSV(path) {
    let data = await d3.csv(path)
      .then(data => data);
    return data
  }

  // Creates or imports all of the data needed for the map
  async function importData() {
    const features = await importJSON(dataPaths.regions)
    const scores = await importCSV(dataPaths.scores)
    return { goalsConfig, features, scores }
  }

  // Convert goal icons from string to SVG element
  function parseSVG(svgString) {
    if (!svgString || typeof svgString != "string" || !svgString.startsWith('<svg')) {
      return null
    }
    // For parsing the SVG icon string
    const parser = new DOMParser();
    const svg = parser.parseFromString(svgString, "image/svg+xml").documentElement;
    return svg
  }

  // Give the raw data, process it so that it's more manageable to use in data
  // visualizations.
  function processData(data) {

    // Parse the goal icons
    data.goalsConfig.forEach(function (goal) {
      if (goal.icon) {
        goal.icon = parseSVG(goal.icon)
      }
    })

    const topoFeatureName = Object.keys(data.features.objects)[0];
    // Convert the topoJSON for easy use in D3 (requires d3js.org/topojson.v1)
    const featureData = topojson
      .feature(data.features, data.features.objects[topoFeatureName])
      .features;
    data.features = featureData;

    // Break down the scores data into grouped JSON objects to improve speed when looking
    // for scores for a given region/year/goal. Otherwise, switching between selected
    // regions/years/goals is a bit slow.

    // Get all the unique years, goals, regionIDs, and dimensions
    data.years = [...new Set(data.scores.map(row => row.scenario))];
    data.goalCodes = [...new Set(data.scores.map(row => row.goal))];
    regionIds = [...new Set(data.scores.map(row => row.region_id))];
    data.dimensions = [...new Set(data.scores.map(row => row.dimension))];

    // Make a map of region IDs to region labels
    data.regionLabels = {}
    regionIds.forEach(function (region) {
      const regionData = data.scores.find(function (d) {
        return d.region_id === region
      })
      data.regionLabels[regionData.region_id] = regionData.region_name
    })

    // Make a grouped dataset. First group by dimension, then year, then goal, then region.
    let groupedData = {}

    // 1. The dimension group
    data.dimensions.forEach(function (dimension) {
      groupedData[dimension] = {}
      const dimensionData = data.scores.filter(function (d) {
        return d.dimension === dimension
      })
      // 2. The year group within dimension
      data.years.forEach(function (year) {
        groupedData[dimension][year] = {}
        const dimensionYearData = dimensionData.filter(function (d) {
          return d.scenario === year
        })
        // 3. The goal group within year within dimension
        data.goalCodes.forEach(function (goal) {
          groupedData[dimension][year][goal] = {}
          const dimensionYearGoalData = dimensionYearData.filter(function (d) {
            return d.goal === goal
          })
          // 4. The region score within goal group within year within dimension
          regionIds.forEach(function (region) {
            const regionData = dimensionYearGoalData.find(function (d) {
              return d.region_id === region
            })
            if (regionData && regionData.value && regionData.value !== missingValueCode) {
              groupedData[dimension][year][goal][region] = Number(regionData.value)
            }
          })
        })
      })
    })

    // Overwrite scores with the new grouped format
    data.scores = groupedData;

    return data
  }

  // Import and process data
  async function getData() {
    const rawData = await importData();
    const processedData = await processData(rawData);
    return processedData
  }

  return getData()
}

export default data