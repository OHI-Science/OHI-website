/** A custom number input that can be styled extensively */

/**
 * The classes to add to the various HTML elements that are combined to create a number
 * slider. The specific HTML elements are defined in the property definitions.
 * @typedef {Object} SliderClasses
 * @property {string} slider - The entire number slider element that is returned
 * @property {string} values - The container for the label, min, and max values
 * @property {string} label - The text with the currently selected number on the slider
 * @property {string} value - The text with the min and max values
 * @property {string} background - The div that represents the entire range of selectable
 * numbers
 * @property {string} progress - The div that highlights the range from the minimum to the
 * currently selected number
 * @property {string} tickMarks - The container for the tick marks
 * @property {string} tickMark - An individual tick mark
*/

/**
 * Create a custom input element that can be styled and contain HTML
 * @param {Object} options - Configurable options for the dropdown
 * @property {number} [min] - The minimum number in range that the number slider displays
 * @property {number} [max] - The maximum number in range that the number slider displays
 * @property {number} [step] - The interval between each selectable number
 * @property {number} [startValue] - The number selected by default
 * @property {number} [handleSize] - The width, in pixels, of the handle
 * @property {SliderClasses} [classes] - Classes to add to the HTML elements created by
 * this function
 * @returns {HTMLElement} A number slider element
 */
function numberSlider({
  min = 0,
  max = 100,
  step = 10,
  startValue = 50,
  handleSize = 14,
  classes = {
    slider: "number-slider",
    values: "number-slider__values",
    label: "number-slider__label",
    value: "number-slider__value",
    background: "number-slider__background",
    progress: "number-slider__progress",
    tickMarks: "number-slider__ticks",
    tickMark: "number-slider__tick"
  }
} = {}) {

  // Initialize the elements that will be modifiable. They will be created in the
  // createSliderHTML function.
  let minLabel = null;
  let maxLabel = null;
  let valueLabel = null;
  let progressEl = null;
  let tickMarksEl = null;
  let inputEl = null;

  let slider = createSliderHTML();

  window.addEventListener("resize", updateValuePosition);

  function createSliderHTML() {

    // Add the slider class to the slider element
    const slider = document.createElement("div");
    slider.classList.add(classes.slider)

    // Create the container with number labels. Insert labels for min, max, current value
    minLabel = document.createElement("div");
    minLabel.innerHTML = min;
    minLabel.classList.add(classes.label)

    maxLabel = document.createElement("div");
    maxLabel.innerHTML = max;
    maxLabel.classList.add(classes.label);

    valueLabel = document.createElement("div");
    valueLabel.innerHTML = startValue;
    valueLabel.classList.add(classes.value)

    var labelContainer = document.createElement("div");
    labelContainer.classList.add(classes.values);
    labelContainer.append(minLabel, maxLabel, valueLabel);

    // Create the background element
    var background = document.createElement("div");
    background.classList.add(classes.background);

    // Create the progress element
    progressEl = document.createElement("div");
    progressEl.classList.add(classes.progress)

    // Create the tick marks container
    tickMarksEl = document.createElement("div");
    tickMarksEl.classList.add(classes.tickMarks)

    // Create the range input
    inputEl = document.createElement("input");
    inputEl.type = "range"
    inputEl.min = min;
    inputEl.max = max;
    inputEl.value = startValue;

    // Add everything to the main container element
    slider.append(labelContainer, background, progressEl, tickMarksEl, inputEl)
    
    setTicks();

    // Set a delay so that the HTML can attach to the DOM
    setTimeout(() => {
      update();
    }, 1);

    inputEl.oninput = selectNumber;

    return slider

  }

  function selectNumber() {
    // Dispatch an event
    const changeEvent = new CustomEvent('update', { detail: inputEl.value });
    slider.dispatchEvent(changeEvent);
    // Update the slider
    update()
  }

  function update() {
    updateValue();
    updateValuePosition();
    updateLabels();
    updateProgress();
  }

  function updateValue() {
    valueLabel.innerHTML = "<div>" + inputEl.value + "</div>";
  }

  function updateValuePosition() {
    
    const percent = getSliderPercent.call(this);

    const sliderWidth = inputEl.getBoundingClientRect().width;
    const valueWidth = valueLabel.getBoundingClientRect().width;

    let left = percent * (sliderWidth - handleSize) + handleSize / 2 - valueWidth / 2;

    left = Math.min(left, sliderWidth - valueWidth);
    left = inputEl.value === inputEl.min ? 0 : left;

    valueLabel.style.left = left + "px";
  }

  function updateLabels() {
    const valueRect = valueLabel.getBoundingClientRect();
    const minLabelRect = minLabel.getBoundingClientRect();
    const maxLabelRect = maxLabel.getBoundingClientRect();

    const minLabelDelta = valueRect.left - (minLabelRect.left);
    const maxLabelDelta = maxLabelRect.left - valueRect.left;

    const deltaThreshold = 32;

    if (minLabelDelta < deltaThreshold) minLabel.classList.add("hidden");
    else minLabel.classList.remove("hidden");

    if (maxLabelDelta < deltaThreshold) maxLabel.classList.add("hidden");
    else maxLabel.classList.remove("hidden");
  }

  function updateProgress() {
    const percent = getSliderPercent.call(this);
    progressEl.style.width = percent * 100 + "%";
  }

  function getSliderPercent() {
    const range = inputEl.max - inputEl.min;
    const absValue = inputEl.value - inputEl.min;

    return absValue / range;
  }

  function setTicks() {
    const spacing = parseFloat(step);
    const sliderRange = inputEl.max - inputEl.min;
    const tickCount = sliderRange / spacing + 1; // +1 to account for 0

    for (let ii = 0; ii < tickCount; ii++) {
      let tick = document.createElement("span");
      tick.className = classes.tickMark;
      tickMarksEl.appendChild(tick);
    }
  }

  return slider

};

export default numberSlider