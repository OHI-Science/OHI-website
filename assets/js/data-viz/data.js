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
 * @property {string} [options.dataPaths.goals] The path to the JSON file that comprises
    the array of OHI goals, in the order to be displayed in the UI. Each goal in the array
    is an Object that comprises the id (e.g. 'AO'), label (e.g. 'Artisanal Fishing
    Opportunities'), file name of the corresponding SVG icon, and, if it is a sub-goal,
    the parent ID. Sub-goals do not need icons, they can use the parent icon. Icons *must*
    be svg files. The directory for the icons is provided by the goalIconsDirPath.
 * @property {string} [options.goalIconsDirPath] The path from the root of the project to
 * the directory that contains the goal icons.
 * @property {string} [options.missingValueCode] The string that is used in the scores CSV
 * that indicates a value is missing.
 * 
 * @returns {Object} - returns an Object with all of the OHI data, formatted for use in
 * the various OHI data viz applications
 */
function data({
  goalIconsDirPath = '/images/goal-icons/',
  missingValueCode = 'NA',
  dataPaths = {
    scores: 'scores.csv',
    regions: 'regions.topojson',
    goals: 'goalLabels.json',
  }
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

  // Fetch and return SVG for inserting inline into the DOM
  async function importSVG(path) {
    // For parsing the SVG icon string
    const parser = new DOMParser();
    let response = await fetch(path)
    let svg = await response.text()
    svg = svg && svg.startsWith('<svg') ? svg : null;
    svg = svg ? parser.parseFromString(svg, "image/svg+xml").documentElement : null;
    return svg
  }

  // If there is a path provided in a goalLabel item's icon property, import the 
  // SVG string and save to the goalLabel item.
  async function attachGoalIcons(goalLabels) {
    if (!goalLabels) {
      return
    }
    for (const goalLabel of goalLabels) {
      if (goalLabel.icon) {
        let dirPath = goalIconsDirPath || "";
        if (dirPath) {
          dirPath += dirPath.endsWith("/") ? "" : "/"
        }
        const fullIconPath = dirPath + goalLabel.icon;
        const svgEl = await importSVG(fullIconPath);
        goalLabel.icon = svgEl;
      }
    }
  }

  // Creates or imports all of the data needed for the map
  async function importData() {
    const features = await importJSON(dataPaths.regions)
    const scores = await importCSV(dataPaths.scores)
    // Map of the codes for each goal and the label user-facing label to use.
    let goalLabels = await importJSON(dataPaths.goals)
    // Import the SVG goal icons. Replace the SVG file path with the SVG element.
    await attachGoalIcons(goalLabels)
    return { goalLabels, features, scores }
  }

  // Give the raw data, process it so that it's more manageable to use in data
  // visualizations.
  function processData(data) {
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