let d3 = window.d3;

// if (!d3) {
//   d3 = Object.assign(
//     {},
//     require("d3-selection"),
//   );
// }

// Parameters imported from the baseof.html template which builds the JS
import colorScale from "./colorScale.js"
import globe from "./globe.js"
import getData from "./data.js"
import utility from "../utility.js"
import numberSlider from "./numberSlider.js"
import dropdown from "./dropdown.js"

/** The OHI global scores overview */

/**
 * The classes to add to the various HTML elements that are combined to create a global
 * scores visualization. The specific HTML elements are defined in the property
 * definitions.
 * @typedef {Object} globalScoresClasses
 * @property {string} globalScores - The global scores container
 * @property {string} globeContainer - The container for the world map / globe
 * @property {string} descriptionContainer - The container for the goal description
 * @property {string} descriptionText - The paragraph with the goal text
 * @property {string} controls - The container for the year and goal inputs
 * @property {string} control - The container for a year or goal input
 * @property {string} legend - The container for the legend
 * @property {string} label - The text labels for the inputs or legend
 * @property {string} regionDetailsContainer - The element that will pop-up or slide out
 * to show details about a clicked region.
 * @property {string} regionDetailsActive - An extra class to add to the region details
 * container when it's visible.
 * @property {string} regionDetailsButton - The button that closes the region details
 * popup.
 * @property {string} regionDetailsTitle - The name of the region in the region details
 * popup.
 * @property {string} regionDetailsParagraph - The text that describes to score/trend for
 * the region in the region details popup.
 * @property {string} regionDetailsLink - The link leading to more information about a
 * region in the region details popup.
*/

/**
 * @param {Object} options - Configurable options for the global scores visualization
 * @property {HTMLElement} options.container - The container into which the global scores
 * visualization should be inserted
 * @property {globalScoresClasses} [options.classes] - Classes to add to the HTML elements
 * created by this function
 */
async function globalScores({
  container = null,
  classes = {
    globalScores: 'global-scores',
    globeContainer: 'global-scores__globe',
    descriptionContainer: 'global-scores__description',
    descriptionText: 'global-scores__description-text',
    controls: 'global-scores__controls',
    control: 'global-scores__control',
    legend: 'global-scores__legend',
    label: 'global-scores__label',
    regionDetailsContainer: 'global-scores__region-details',
    regionDetailsActive: 'global-scores__region-details--visible',
    regionDetailsButton: 'global-scores__region-details-button',
    regionDetailsTitle: 'global-scores__region-details-title',
    regionDetailsParagraph: 'global-scores__region-details-paragraph',
    regionDetailsLink: 'global-scores__region-details-link',
  }
} = {}) {

  if (!container) {
    console.log("A container is required to render a global scores visualization.");
    return
  }

  // Import and process the scores & features data
  const ohiData = await getData();

  // Ensure the container has the global- cores class.
  container.classList.add(classes.globalScores)

  // Create a container for the goal description
  const descriptionContainer = document.createElement('div');
  const descriptionPara = document.createElement('p');
  descriptionPara.classList.add(classes.descriptionText);
  descriptionContainer.appendChild(descriptionPara)
  descriptionContainer.classList.add(classes.descriptionContainer);

  // Create a container for the year and goals inputs
  const controls = document.createElement('div');
  controls.classList.add(classes.controls);

  // Create a container for the globe
  const globeContainer = document.createElement('div');
  globeContainer.classList.add(classes.globeContainer);

  // Create a container for the legend
  const legendContainer = document.createElement('div');
  legendContainer.classList.add(classes.legend);
  // Insert the legend
  const legend = colorScale.getLegend(classes.label)
  legendContainer.appendChild(legend);

  // Create a container for the region details that will appear when a region is clicked /
  // in focus.
  const detailsContainer = document.createElement('div');
  detailsContainer.classList.add(classes.regionDetailsContainer);
  // TODO: remove. Add text for testing.
  detailsContainer.textContent = "details container!"

  // Append the sub-containers to the main global scores element
  container.append(
    controls, descriptionContainer, globeContainer, legendContainer, detailsContainer
  );

  // Create the globe / map
  let scoresGlobe = globe({
    container: globeContainer,
    featureData: ohiData.features
  })

  // The min and max years that exist for the OHI data
  const maxYear = Math.max(...ohiData.years);
  const minYear = Math.min(...ohiData.years);

  // Set the initial/default selections
  let selections = {
    dimension: 'score',
    year: maxYear.toString(),
    goal: 'Index',
    regionId: null
  }

  // Listen for when a region is clicked on the globe. Show and update the region details
  // popup. Or close it, if a region was un-focused.
  globeContainer.addEventListener('regionFocused', function (e) {
    selections.regionId = e.detail.regionId
    updateRegionDetails()
  }, false);

  // Update event will be called while the user sliders
  // the number slider. Use debounce to limit updates.
  const updateGlobe = utility.debounce(function () {
    // Get the currently selected data
    let scoreValues = ohiData.scores[selections.dimension][selections.year][selections.goal]
    // Update the region colours on the map
    scoresGlobe.updateScores(scoreValues);
  }, 200)

  createControls()
  updateGlobe()
  updateDescription()
  updateRegionDetails()

  // Update the description of the goal, depending on the goal that is current selected
  function updateDescription() {
    const selectedGoal = ohiData.goalsConfig.find(function (goal) {
      return goal.id === selections.goal
    })

    let descriptionText = ""
    if (selectedGoal) {
      descriptionText = selectedGoal.description ? selectedGoal.description : ""
      url = selectedGoal.url
      if (url) {
        descriptionText = descriptionText + " " + "<a href='" + url + "'>Learn more</a>"
      }
    }

    descriptionPara.innerHTML = descriptionText
  }

  // Create the inputs for year and goal
  function createControls() {

    // Create the labels and containers

    // Year
    const yearControl = document.createElement("div");
    yearControl.classList = classes.control;
    const yearLabel = document.createElement("span");
    yearLabel.classList = classes.label;

    // Score
    const goalControl = yearControl.cloneNode(true);
    const goalLabel = yearLabel.cloneNode(true);

    yearControl.appendChild(yearLabel);
    goalControl.appendChild(goalLabel);

    yearLabel.innerText = "Year";
    goalLabel.innerText = "Goal";

    controls.append(goalControl, yearControl);

    // Create the years input
    const yearSlider = numberSlider({
      min: minYear,
      max: maxYear,
      step: 1,
      startValue: maxYear
    });
    yearSlider.addEventListener('update', function (e) {
      selections.year = e.detail.toString();
      updateGlobe()
      updateRegionDetails()
    });
    yearControl.appendChild(yearSlider);

    // Create the goals input
    const goalsInput = dropdown({
      data: ohiData.goalsConfig,
      selected: selections.goal
    })
    goalsInput.addEventListener('update', function (e) {
      // Update the selected goal
      selections.goal = e.detail.id;
      // Update the map
      updateGlobe()
      updateDescription()
      updateRegionDetails()
    })
    goalControl.appendChild(goalsInput);

  }

  // Updates the pop-up with more information about the selected region. Or hides it when
  // a region is un-selected.
  function updateRegionDetails() {

    // Empty the details container.
    detailsContainer.innerHTML = '';

    // Hide the container and exit this function if no region is selected
    if (!selections.regionId && selections.regionId !== 0) {
      detailsContainer.classList.remove(classes.regionDetailsActive);
      return
    }
    
    // Add active class
    detailsContainer.classList.add(classes.regionDetailsActive);

    // Get data for the selected region / goal / dimension / year
    const regionId = selections.regionId;
    const regionLabel = ohiData.regionLabels[regionId]
    const regionLink = ohiData.regionPageLinks[regionId]
    let scoreForSelection = ohiData.scores[selections.dimension][selections.year][selections.goal][selections.regionId]
    scoreForSelection = Math.round(scoreForSelection)      
    const goalData = ohiData.goalsConfig.find(function (goal) {
      return goal.id === selections.goal
    })
    const goalLabel = goalData.label;
    const dimension = selections.dimension
    const year = selections.year

    // Add a button to close the popup
    const button = document.createElement('button')
    button.classList.add(classes.regionDetailsButton)
    button.title = 'Close this popup'
    // X SVG symbol
    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" stroke="currentColor">
        <line x2="50" y2="50" />
        <line x1="50" y2="50" />
    </svg>`
    button.addEventListener('click', function () {
      scoresGlobe.removeFocus()
    })

    // Add a title
    const title = document.createElement('h2');
    title.innerHTML = regionLabel;
    title.classList.add(classes.regionDetailsTitle)

    // Add information about the selected region
    const paragraph = document.createElement('p');
    paragraph.innerHTML = `The ${goalLabel} ${dimension} for ${regionLabel} in ${year} is <b>${scoreForSelection}</b>.`
    paragraph.classList.add(classes.regionDetailsParagraph)
    
    // Create a link to the region
    const link = document.createElement('a');
    link.href = regionLink
    link.title = `See full details about ${dimension}s for ${regionLabel}`
    link.innerHTML = `See all ${dimension}s for ${regionLabel}`
    link.classList.add(classes.regionDetailsLink)

    // Add everything to the container
    detailsContainer.append(button, title, paragraph, link)


    
  }

};

export default globalScores