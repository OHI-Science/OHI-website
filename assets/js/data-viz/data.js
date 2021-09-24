let d3 = window.d3;

// if (!d3) {
//   d3 = Object.assign(
//     {},
//     require("d3-fetch")
//   );
// }

// For processing topojson
import * as topojson from "topojson-client";
// Parameters imported from the baseof.html template which builds the JS
import params from '@params'

const cloneDeep = require('lodash/cloneDeep');

let dataBundleConfig = {};
if (params.dataConfig) {
  dataBundleConfig = JSON.parse(params.dataConfig)
}

/**
 * Loads and processes OHI Data.
 * @param {Object} options
 * @property {string} [options.version] A code used to version the data. This is used to
 * determine whether the localStorage, where the data is stored, should be refreshed with
 * new, re-processed data.
 * @property {string} [options.dataPaths.scores] The path to the CSV file that comprises
 * the complete scores data
 * @property {string} [options.dataPaths.regions] The path to the topoJSON file that has
 * ocean, land, and eez feature information
 * @property {string} [options.goalsConfig] JSON that comprises the array of OHI goals, in
 * the order to be displayed in the UI. Each goal in the array is an Object that comprises
 * the id (e.g. 'AO'), label (e.g. 'Artisanal Fishing Opportunities'), SVG icon, and, if
 * it is a sub-goal, the parent ID. Sub-goals do not need icons, they can use the parent
 * icon. Icons *must* be SVG content embedded into the JSON.
 * @property {string} [options.regionPageLinks] JSON map of region ID to the permalink for
 * each region page
 * @property {string} [options.missingValueCode] The string that is used in the scores CSV
 * that indicates a value is missing.
 *
 * @returns {Object} - returns an Object with all of the OHI data, formatted for use in
 * the various OHI data viz applications
 */
function data({
  version = "1",
  missingValueCode = 'NA',
  dataPaths = {
    scores: 'scores.csv',
    regions: 'regions.topojson',
  },
  goalsConfig = {},
  regionPageLinks = {}
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
    const trends = await importCSV(dataPaths.trends)
    return { goalsConfig, regionPageLinks, features, scores, trends }
  }

  function parseIcons(dataIn) {
    // clone the data
    data = cloneDeep(dataIn)
    data.goalsConfig.forEach(function (goal) {
      if (goal.icon) {
        goal.icon = parseSVG(goal.icon)
      }
    })
    return data
  }

  function serializeIcons(dataIn) {
    // clone the data
    data = cloneDeep(dataIn)
    var serializer = new XMLSerializer();
    data.goalsConfig.forEach(function (goal) {
      if (goal.icon) {
        goal.icon = serializer.serializeToString(goal.icon)
      }
    })
    return data
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
    data = parseIcons(data)

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

    // Now add the trends data. It's a little different since the year component is a range, and there's a p-value.
    // Get the name of the dimension that we're using for trends. Also get the year range that we have for trends.
    const trendDimension = data.trends[0].dimension
    const trendTimeInterval = data.trends[0].scenario

    groupedData[trendDimension] = {}
    groupedData[trendDimension][trendTimeInterval] = {}

    // Range through goals and regions for trends like we do for the other scores
    data.goalCodes.forEach(function (goal) {
      groupedData[trendDimension][trendTimeInterval][goal] = {}
      const trendGoalData = data.trends.filter(function (d) {
        return d.goal === goal
      })
      // The region score within goal group within year within dimension
      regionIds.forEach(function (region) {
        const trendRegionData = trendGoalData.find(function (d) {
          return d.region_id === region
        })
        if (trendRegionData && trendRegionData.value && trendRegionData.value !== missingValueCode) {
          groupedData[trendDimension][trendTimeInterval][goal][region] = Number(trendRegionData.value)
        }
      })
    })

    // Overwrite scores with the new grouped format
    data.scores = groupedData;

    // Remove the trends data now
    delete data.trends;

    // Save references to the keys for the trends data
    data.trendDimension = trendDimension;
    data.trendTimeInterval = trendTimeInterval;

    // Convert the regionPageLinks from an Array (faster for Hugo to create) to a map
    // (easier to use in JS)
    const regionPageLinksMap = {}
    data.regionPageLinks.forEach(function (pageLink) {
      regionPageLinksMap[pageLink.regionId] = pageLink.url
    })
    data.regionPageLinks = regionPageLinksMap

    return data
  }

  function storeData(data) {
    // Stringify the SVG icons
    data = serializeIcons(data)
    window.localStorage.setItem('ohiDataVersion', version);
    window.localStorage.setItem('ohiData', JSON.stringify(data));
  }

  function getStoredData(){
    let storedData = window.localStorage.getItem('ohiData')
    if (!storedData) {
      return null
    }
    const storedVersion = window.localStorage.getItem('ohiDataVersion');
    if (storedVersion !== version) {
      window.localStorage.removeItem('ohiData')
      return null
    }
    storedData = JSON.parse(storedData)
    // parse the SVG icons
    storedData = parseIcons(storedData)
    return storedData
  }

  // Import and process data
  async function getData() {
    const storedData = getStoredData()
    if (storedData) {
      return storedData
    }
    const rawData = await importData();
    const processedData = processData(rawData);
    storeData(processedData)
    return processedData
  }

  return getData()
}

export default data