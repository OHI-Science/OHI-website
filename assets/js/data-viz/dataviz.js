// Import all the D3 modules needed for all the data viz
window.d3 = require("d3")

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
            linkTo: regionAsterEl.dataset.linkTo || "methodology",
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

  // If this is a line graph, then render it
  const regionTimeSeriesEls = document.querySelectorAll(".region-time-series");
  if (regionTimeSeriesEls) {
    import('./regionTimeSeries.js')
      .then(function (regionTimeSeries) {
        regionTimeSeriesEls.forEach(function (regionTimeSeriesEl) {
          regionTimeSeries.default({
            container: regionTimeSeriesEl,
            regionId: regionTimeSeriesEl.dataset.regionId,
          })
        })
      })
  }

  // If this is a gauge plot, then render it
  const scoreGaugeEls = document.querySelectorAll(".score-gauge");
  if (scoreGaugeEls) {
    import('./scoreGauge.js')
      .then(function (scoreGauge) {
        scoreGaugeEls.forEach(function (scoreGaugeEl) {
          var scoreGaugeOptions = {
            container: scoreGaugeEl,
          }
          if (scoreGaugeEl.dataset.regionId) {
            scoreGaugeOptions.regionId = scoreGaugeEl.dataset.regionId
          }
          if (scoreGaugeEl.dataset.goalCode) {
            scoreGaugeOptions.goalCode = scoreGaugeEl.dataset.goalCode
          }
          scoreGauge.default(scoreGaugeOptions)
        })
      })
  }

  // If this is a regions dropdown, then render it
  const regionsDropdownContainers = document.querySelectorAll(".regions-dropdown");
  if (regionsDropdownContainers) {
    import('./regionsDropdown')
      .then(function (regionsDropdown) {
        regionsDropdownContainers.forEach(function (regionsDropdownContainer) {
          regionsDropdown.default().then(
            function (dropdownEl) {
              regionsDropdownContainer.append(dropdownEl)
            }
          )
        })
      })
  }


}

export default { init }