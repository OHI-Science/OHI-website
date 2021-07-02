const d3 = Object.assign(
  {},
  require("d3-selection"),
);

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
    label: 'global-scores__label'
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

  // Append the sub-containers to the main global scores element
  container.append(controls, descriptionContainer, globeContainer, legendContainer);

  // Create the globe / map
  let myGlobe = globe({
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
  }

  // Update event will be called while the user sliders
  // the number slider. Use debounce to limit updates.
  const updateGlobe = utility.debounce(function () {
    // Get the currently selected data
    let scoreValues = ohiData.scores[selections.dimension][selections.year][selections.goal]
    // Update the region colours on the map
    myGlobe.updateScores(scoreValues);
  }, 200)

  createControls()
  updateGlobe()
  updateDescription()

  // Update the description of the goal, depending on the goal that is current selected
  function updateDescription() {
    const selectedGoal = ohiData.goalsConfig.find(function (goal) {
      return goal.id === selections.goal
    })
    const descriptionText = selectedGoal ? selectedGoal.description : null
    if (descriptionText) {
      descriptionPara.innerHTML = descriptionText + " " + "<a href='#'>Learn more</a>"
    } else {
      descriptionPara.innerHTML = ""
    }
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
    })
    goalControl.appendChild(goalsInput);
    
  }

};

export default globalScores