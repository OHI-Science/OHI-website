const d3 = Object.assign(
  {},
  require("d3-drag"),
  require("d3-selection"),
  require("d3-geo"),
  require("d3-transition"),
  require("d3-interpolate"),
  require("d3-geo-projection") // for geoMollweide
);

import regionTooltip from "./regionTooltip.js"
import colorScale from "./colorScale.js"

/** An interactive world globe that shows the OHI regions and scores. */

/**
 * The names of the feature properties saved in the topojson properties objects
 * @typedef {Object} PropertyKeys
 * @property {string} Type - The name of the property used to identify what type of polygon each feature
 *   is (land, water, or region).
 * @property {string} ID - The name of the property that gives the ID for the feature.
 * @property {string} Name - The property that gives the user-facing name/label for the feature.
 * 
*/

/**
 * All possible feature types listed in the 'type' property (in the topojson feature
 * properties), organized by three main types.
 * @typedef {Object} FeatureTypes
 * @property {String[]} land - Types used to identify polygons of country or other land
 * regions that are not interactive.
 * @property {String[]} water - Types used to identify polygons of water regions (e.g.
 * fishing areas) that are not interactive.
 * @property {String[]} region - Types used to identify the key areas that are
 * clickable/focusable, and that get updated based on the scores data, i.e. the OHI
 * regions.
*/

/**
 * The classes to add to the various HTML elements that are combined to create a globe.
 * The specific HTML elements are defined in the property definitions.
 * @typedef {Object} GlobeClasses
 * @property {string} globe - The entire globe element
 * @property {string} water - SVG paths that represent water (e.g. ocean regions)
 * @property {string} land - SVG paths that represent land (e.g. countries)
 * @property {string} region - SVG paths that represent the focus regions, i.e. OHI regions with scores
 * @property {string} focused - Additional class to add to a region when it is clicked and in focus
 * @property {string} button - The class to add to map buttons, like the button that switches the projection
 * 
*/

/**
 * Creates an interactive world globe that shows the OHI regions and scores.
 * @param {Object} options - The configuration for the globe visualization
 * @property {HTMLElement} container - The HTML element that should contain the globe
 * @property {Object} featureData - The topoJSON feature data with land, ocean, and OHI
 * region features
 * @property {Object} [scoreValues] -
 * @property {number} [width] - The relative width of the SVG
 * @property {number} [height] - The relative height of the SVG
 * @property {number} [sens] - Defines the 'strength' of the rotation behaviour
 * @property {PropertyKeys} [propertyKeys] - A map of properties contained in the feature
 * properties
 * @property {FeatureTypes} [featureTypes] - Categorizes all the feature types as either
 * water, land, or (OHI) region
 * @property {GlobeClasses} [classes] - The class names to add to the HTML elements
 * created by this function
 * @returns {Object} - Returns an object with functions that allow interaction with the globe
 */
function globe ({
  container,
  featureData,
  scoreValues,
  width = 600,
  height = 500,
  sens = 0.15,
  propertyKeys = {
    type: 'rgn_typ',
    id: 'rgn_id',
    name: 'rgn_nam'
  },
  featureTypes = {
    land: ['land', 'land-disputed', 'land-noeez'],
    water: ['fao', 'eez-ccamlr'],
    region: ['eez', 'eez-disputed', 'eez-inland']
  },
  classes = {
    globe: 'globe',
    water: 'globe__water',
    land: 'globe__land',
    region: 'globe__region',
    focused: 'globe__region--focused',
    button: 'globe__button'
  }
} = {}) {

  if (!featureData) {
    console.log('Feature data is required to render the globe.');
    return
  }
  if (!container) {
    console.log('A container is required to render the globe')
    return;
  }

  // For the the spherical, interactive globe.
  const projectionSphere = d3.geoOrthographic()
    .scale(245)
    .rotate([0, 0])
    .translate([width / 2, height / 2])
    .clipAngle(90);
  
  // For the flat, non-interactive globe
  const projectionFlat = d3.geoMollweide()
    .scale(165)
    .translate([width / 2, height / 2])
    .precision(0.1);

  // Set the projection for the spherical, interactive globe.
  let projection = projectionSphere;

  globeIcon = `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M17.36,2.64L15.95,4.06C17.26,5.37 18,7.14 18,9A7,7 0 0,1 11,16C9.15,16 7.37,15.26 6.06,13.95L4.64,15.36C6.08,16.8 7.97,17.71 10,17.93V20H6V22H16V20H12V17.94C16.55,17.43 20,13.58 20,9C20,6.62 19.05,4.33 17.36,2.64M11,3.5A5.5,5.5 0 0,0 5.5,9A5.5,5.5 0 0,0 11,14.5A5.5,5.5 0 0,0 16.5,9A5.5,5.5 0 0,0 11,3.5M11,5.5C12.94,5.5 14.5,7.07 14.5,9A3.5,3.5 0 0,1 11,12.5A3.5,3.5 0 0,1 7.5,9A3.5,3.5 0 0,1 11,5.5Z" />
    </svg>`
  
  flatIcon = `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M20.5,3L20.34,3.03L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21L3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19.03 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3M10,5.47L14,6.87V18.53L10,17.13V5.47M5,6.46L8,5.45V17.15L5,18.31V6.46M19,17.54L16,18.55V6.86L19,5.7V17.54Z" />
    </svg>`

  const switchProjButton = document.createElement("button");
  switchProjButton.classList = classes.button;
  switchProjButton.innerHTML = flatIcon
  switchProjButton.onclick = toggleProjection;
  container.appendChild(switchProjButton)
  
  // A function used to draw SVG paths in the given projection
  let path = d3.geoPath().projection(projection);

  // Ensure the container has the globe class.
  container.classList.add(classes.globe)

  // Create the tooltip elements
  const tooltip = regionTooltip();

  // Create an SVG to hold the globe and render it in the container
  const svg = d3.select(container)
    .append('svg')
    .attr('preserveAspectRatio', 'xMidYMid')
    .attr('viewBox', [0, 0, width, height]);
  
  // Create a base 'sphere'/water layer that will listen for the drag event.
  // Useful if the feature data doesn't cover the entire globe.
  const sphere = svg.append('path')
    .datum({ type: 'Sphere' })
    .attr('class', classes.water)
    .attr('d', path)
    .call(d3.drag()
      .subject(getSubject)
      .on('drag', rotatePolygons));

  // Draw polygons on the globe using the feature data
  const world = svg.selectAll(null)
    .data(featureData)
    .join('path')
    .attr('d', path)
    .attr('class', getClass)
    // Drag event
    .call(d3.drag()
      .subject(getSubject)
      .on('drag', rotatePolygons)
    );

  // Save the region polygons so so that we can update their fill as needed, and add
  // behaviour
  let regionSelection = d3.selectAll('.' + classes.region);

  // Add click-to-focus and tooltip functionality to the regions
  regionSelection
    .on('click', focusRegion)
    .on('mouseover', function (event, feature) {
      const text = feature && feature.properties ? feature.properties[propertyKeys.name] : null;
      const num = getScore(feature);
      const color = getColour(feature);
      tooltip.update(text, num, color)
    })
    .on('mousemove', function (event, feature) {
      tooltip.reposition(event.pageX, event.pageY)
    })
    .on('mouseout', tooltip.hide);

  // Shade the region by given score
  updateScores(scoreValues);

  // Switches the map's projection between a flat, map like projection, and a spherical
  // interactive globe.
  function toggleProjection() {
    if (projection == projectionSphere) {
      projection = projectionFlat
      switchProjButton.innerHTML = globeIcon
    } else {
      projection = projectionSphere
      switchProjButton.innerHTML = flatIcon
    }
    let path = d3.geoPath().projection(projection);
    sphere.attr('d', path)
    world.attr('d', path)
  }

  // Given the score data, update the fill on the polygon regions
  function updateScores(newScoreValues) {
    // Save the score values for other functions to access
    scoreValues = newScoreValues
    // Update the fill for regions
    regionSelection.attr('fill', getColour)
  }

  // Get the class for each polygon
  function getClass(feature) {
    const type = getType(feature);
    return classes[type]
  }

  // Get score colour based on a feature
  function getColour(feature) {
    const score = getScore(feature)
    return colorScale.getLegendColor(score)
  }

  // Get the score from a feature based on the current data
  function getScore(feature) {
    if (!feature) {
      return null
    }
    const id = feature.properties[propertyKeys.id];
    const score = scoreValues ? scoreValues[id] : null;
    return score
  }

  // Given a feature, get it's general polygon type (land, water, or region)
  function getType(feature) {
    const subtype = feature.properties[propertyKeys.type];
    for (const [key, subtypes] of Object.entries(featureTypes)) {
      if (subtypes.includes(subtype)) {
        return key
      }
    }
  }

  // Checks if a feature is a 'region' type
  function isRegion(feature) {
    return getType(feature) === 'region'
  }

  // Defines the location of the drag start position relative to the current orientation
  function getSubject() {
    // Do not rotate the globe if it's not in the spherical projection
    if (projection == projectionFlat) {
      return
    }
    const r = projection.rotate();
    const x = r[0] / sens;
    const y = -r[1] / sens;
    return { x, y }
  }

  // Re-draws the polygons to make the globe appear to rotate
  function rotatePolygons(event) {
    // Do not rotate the globe if it's not in the spherical projection
    if (projection == projectionFlat) {
      return
    }
    var rotate = projection.rotate();
    projection.rotate([event.x * sens, -event.y * sens, rotate[2]]);
    // Re-define the polygon paths
    world.attr('d', path);
    removeFocus()
  }

  // Remove the focused class from all regions
  function removeFocus() {
    svg.selectAll('.' + classes.focused).classed(classes.focused, focused = false);
  }

  // Country focus on option select
  function focusRegion(event, feature) {

    const focusedRegion = feature;
    const focusedRegionId = feature.properties[propertyKeys.id]
    const p = d3.geoCentroid(focusedRegion);

    // Remove any previously added focused classes
    removeFocus();

    // Add the 'focused' class
    world.classed(classes.focused, function (feature, i) {
      return feature.properties[propertyKeys.id] == focusedRegionId ?
        focused = feature :
        false;
    });

    // Don't rotate the map if the map isn't in the sphere projection.
    if (projection == projectionFlat) {
      return
    }

    // Rotate the globe
    d3.transition()
      .duration(1000)
      .tween('rotate', function () {
        var r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
        return function (t) {
          projection.rotate(r(t));
          world.attr('d', path)
        };
      })
  };

  // Given the ID of a polygon, rotate the globe such that the centroid
  // of that polygon is in the center of the globe. Add the focused class.
  function focusRegionById(id) {
    var feature = world.filter(
      function (feature, i) {
        return feature.properties && feature.properties[propertyKeys.id] ?
          feature.properties[propertyKeys.id] == id :
          false
      }
    );
    if (!feature.empty()) {
      focusRegion(null, feature.data()[0])
    }
  }

  return Object.freeze({
    focusRegionById, removeFocus, updateScores
  })
};

export default globe