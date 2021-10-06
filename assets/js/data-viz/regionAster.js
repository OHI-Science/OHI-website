let d3 = window.d3;

// if (!d3) {
//   d3 = Object.assign(
//     {},
//     require("d3-selection"),
//   );
// }

import getData from "./data.js"
import aster from "./aster.js"
import numberSlider from "./numberSlider.js"

/**
 * The classes to add to the various HTML elements that are combined to create a region
 * aster visualization. The specific HTML elements are defined in the property
 * definitions.
 * @typedef {Object} RegionAsterClasses
 * @property {string} regionAster - The entire container
 * @property {string} plot - The aster plot with legend
 * @property {string} controls - The container for the controls
 * @property {string} control - An individual control (i.e. the year slider)
 * @property {string} label - A control label
 */

/**
 * Creates a aster plot with year slider for an individual region.
 * @param {Object} options - Configurable options for the aster plot for a region with
 * time line slider.
 * @property {HTMLElement} container - The container into which the region aster
 * visualization should be inserted
 * @property {string} regionId - The ID of the region to display
 * @property {RegionAsterClasses} [classes] - Classes to add to the HTML elements created
 * by this function
 * @property {string} linkTo - Which of the goal pages the aster plot should link to. By
 * default, links to the 'methodology' page which gives a description and overview of the
 * goal. Can also be set to 'score', which will instead link to the goal page that gives
 * an overview of the global score for that goal.
 */
async function regionAster({
  container = null,
  regionId = null,
  classes = {
    regionAster: "region-aster",
    plot: "region-aster__plot",
    controls: "region-aster__controls",
    control: "region-aster__control",
    label: "region-aster__label"
  },
  linkTo = 'methodology'
} = {}) {

  if (!container) {
    console.log("A container is required to render the region aster visualization");
    return
  }
  if (!regionId) {
    console.log("A region ID must be set when creating a region aster visualization");
    return
  }

  // Import and process the scores & features data
  const ohiData = await getData();

  // Get the min and max years available from the data
  const maxYear = Math.max(...ohiData.years);
  const minYear = Math.min(...ohiData.years);

  // The initially selected data (some of this can be changed by user, e.g. date)
  const selections = {
    year: maxYear.toString(),
    dimension: 'score',
    region: regionId
  }

  // Ensure the container has the main class
  container.classList.add(classes.regionAster)

  // Create the containers for the plot and year control

  // For the aster plot
  const plotContainer = document.createElement("div");
  plotContainer.classList = classes.plot;

  // For the year slider
  const controls = document.createElement("div");
  controls.classList = classes.controls;

  // Add both to the main container
  container.append(plotContainer, controls)

  // Given the selections, process the data so that it's formatted for the aster plot.
  let data = getAsterData()
  // Render the aster plot
  const asterPlot = aster({
    container: plotContainer,
    data: data.arcs,
    meanScore: data.meanScore
  });
  
  // Insert the number slider with years into the controls container
  createYearSlider();
  
  // Retrieves data given the current selections, and updates the aster plot with new data
  function updateAsterPlot() {
    // Given the selections, process the data so that it's formatted for the aster plot.
    let data = getAsterData()
    // Update the data in the plot
    asterPlot.updateData(data.arcs, data.meanScore);
  }

  // Process the OHI data and return it formatted for the aster plot
  function getAsterData() {

    // This will hold the data for the aster plot
    let arcs = []

    // Prepare the data for the aster plot
    const yearDimensionData = ohiData.scores[selections.dimension][selections.year]
    const meanScore = yearDimensionData['Index'][selections.region]
    
    // Go through each of the goals in the order they are displayed in the goalsConfig
    // array. Exclude sub-goals and the overall index (which will be used for the
    // meanScore in the centre).
    ohiData.goalsConfig.forEach(function (goalLabel, index) {
      if (!goalLabel.parent && goalLabel.id !== 'Index') {
        let url = null;
        if (linkTo === 'methodology') {
          url = goalLabel.url
        } else if (linkTo === 'score') {
          url = goalLabel.urlScore
        }
        const d = {
          id: goalLabel.id,
          label: goalLabel.label,
          score: yearDimensionData[goalLabel.id][selections.region],
          color: goalLabel.color,
          icon: goalLabel.icon,
          url: url
        }
        arcs.push(d)
      }
    })

    return { arcs, meanScore }
  }

  // Create the year slider
  function createYearSlider() {

    const yearControl = document.createElement('div');
    yearControl.classList = classes.control;
    const yearLabel = document.createElement('span');
    yearLabel.classList = classes.label;

    yearControl.appendChild(yearLabel);
    yearLabel.innerText = 'Year';

    controls.append(yearControl);

    // Create the years input
    const yearSlider = numberSlider({
      min: minYear,
      max: maxYear,
      step: 1,
      startValue: maxYear
    });
    yearSlider.addEventListener('update', function (e) {
      selections.year = e.detail.toString();
      updateAsterPlot()
    });
    yearControl.appendChild(yearSlider);
  }

  // return {}

};

export default regionAster