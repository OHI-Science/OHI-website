// Import all the D3 modules needed for all the data viz
window.d3 = Object.assign(
  {},
  require("d3-selection"),
  require("d3-drag"),
  require("d3-selection"),
  require("d3-geo"),
  require("d3-transition"),
  require("d3-interpolate"),
  require("d3-geo-projection"),
  require("d3-scale"),
  require("d3-array"),
  require("d3-axis"),
  require("d3-shape"),
  require("d3-fetch")
);

function init() {
  // If the scoresGlobe short code is used in this page, then render the interactive globe
  // with scores.
  const scoresGlobeEls = document.querySelectorAll(".global-scores");
  if (scoresGlobeEls) {
    import('./globalScores.js')
      .then(function (globalScores) {
        scoresGlobeEls.forEach(function (scoresGlobeEl) {
          globalScores.default({
            container: scoresGlobeEl
          });
        })
      })
  }

  // If this is a region scores page, then render the region aster plot.
  const regionAsterEls = document.querySelectorAll(".region-aster");
  if (regionAsterEls) {
    import('./regionAster.js')
      .then(function (regionAster) {
        regionAsterEls.forEach(function (regionAsterEl) {
          regionAster.default({
            container: regionAsterEl,
            regionId: regionAsterEl.dataset.regionId,
          })
        })
      })
  }

  // If this is a region scores page, then render the region rank chart.
  const regionRankChartEls = document.querySelectorAll(".region-rank-chart");
  if (regionRankChartEls) {
    import('./regionRankChart.js')
      .then(function (regionRankChart) {
        regionRankChartEls.forEach(function (regionRankChartEl) {
          regionRankChart.default({
            container: regionRankChartEl,
            regionId: regionRankChartEl.dataset.regionId,
          })
        })
      })
  }
}

export default { init }