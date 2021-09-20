import dropdown from "./dropdown.js"
import getData from "./data.js"

/**
 * Creates a dropdown that shows a list of all the OHI regions (countries). Selecting on a
 * region in the dropdown navigates to the associated region page.
 * @returns The dropdown element to be added to the DOM
 */
async function regionsDropdown() {

  // Import and process the scores & features data
  const ohiData = await getData();

  const dropdownData = []

  for (const [id, label] of Object.entries(ohiData.regionLabels)) {
    // We don't want the 'Global Average' in the dropdown
    if (id !== '0') {
      dropdownData.push({
        id: id,
        label: label
      })
    }
  }

  // Show list of regions in alphabetical order
  dropdownData.sort((a, b) => (a.label > b.label) ? 1 : -1)

  // Create the goals input
  const regionsDropdownEl = dropdown({
    data: dropdownData,
    placeholderText: 'Select a region'
  })

  regionsDropdownEl.addEventListener('update', function (e) {
    const regionId = e.detail.id;
    const url = ohiData.regionPageLinks[regionId]
    if (url) {
      window.location.assign(url)
    }
  })

  return regionsDropdownEl;

};

export default regionsDropdown