
/** A custom input element that can be styled and contain HTML */

/**
 * A selectable item in the dropdown list of items
 * @typedef {Object} Item
 * @property {string} id - The hidden identifier (or 'value') for the item
 * @property {string} label - The user-facing name of this item
 * @property {string} [icon] - (TODO) - An icon that will appear next to the label
 * @property {string} [parent] - If this is a sub-item, the ID of the parent element. If a
 * parent is provided, then this item will appear as a sub-item and will use it's parents
 * icon. It should be appear after the parent in the Array of items. 
 * @property {string} [subtext] - Additional text to show after the label.
 */

/**
 * The classes to add to the various HTML elements that are combined to create a dropdown.
 * The specific HTML elements are defined in the property definitions.
 * @typedef {Object} DropdownClasses
 * @property {string} dropdown - The entire dropdown element that will be returned
 * @property {string} input - The div that acts like an input element, that a user clicks
 * to show or hide the list of options
 * @property {string} inputActive - The class to add to the input when the dropdown is
 * shown
 * @property {string} placeholder - The div that contains the placeholder text and the
 * chevron
 * @property {string} placeholderText - The text that is displayed when no option is
 * selected
 * @property {string} list - The list of options/items
 * @property {string} listHidden - The class to add to the list when it is collapsed
 * @property {string} item - An individual item in the dropdown list
 * @property {string} childItem - An extra class added to items that have a parent item
 * @property {string} subtext - Additional text that appears after the item label
 * @property {string} itemIcon - The class to add to inline SVGs used as icons for a given
 * item/option
 */

/**
 * Create a custom input element that can be styled and contain HTML
 * @param {Object} options - Configurable options for the dropdown
 * @property {string} [placeholderText] - The text to show by default when no item is
 * selected
 * @property {DropdownClasses} [classes] - The classes to add to the various HTML elements
 * that the dropdown comprises
 * @property {Item[]} [data] - The items/options to display in the dropdown list
 * @property {string} [selected] - The ID of the pre-selected Item (this will hide the
 * placeholder text)
 * @returns {HTMLElement} A dropdown element
 */
function enhancedDropdown({
  placeholderText = "Select one",
  classes = {
    dropdown: "dropdown",
    input: "dropdown__input",
    inputActive: "dropdown__input--active",
    placeholder: "dropdown__placeholder",
    placeholderText: "dropdown__placeholder-text",
    list: "dropdown__list",
    listHidden: "dropdown__list--hidden",
    item: "dropdown__item",
    childItem: "dropdown__item--child",
    subtext: "dropdown__subtext",
    itemIcon: "dropdown__icon"
  },
  data = [],
  selected = null,
} = {}) {

  // Clone the data so that we are not making changes to the original array, outside of
  // this dropdown component
  data = data.map(a => ({ ...a }));

  // Create the dropdown
  const dropdown = document.createElement("div");
  dropdown.classList = classes.dropdown;
  const input = createInput();
  const list = createList();
  dropdown.append(input, list);

  // Create the custom "input" with placeholder text
  function createInput(){

    // Create the input element
    const input = document.createElement("div");
    input.classList = classes.input;
    input.addEventListener("click", toggleDropdown);

    // Create the input placeholder content
    const placeholder = document.createElement("div");
    placeholder.classList = classes.placeholder;

    const placeholderTextEl = document.createElement("span");
    placeholderTextEl.textContent = getLabelById(selected) || placeholderText;
    placeholderTextEl.classList = classes.placeholderText;
    placeholder.appendChild(placeholderTextEl);

    // Add everything to the input
    input.appendChild(placeholder);

    return input;
  };

  // Create the list of options
  function createList() {
    
    // Create the dropdown list of options
    const list = document.createElement("ul");
    list.classList.add(classes.list, classes.listHidden);

    data.forEach(item => {

      let {
        id,
        label,
        subtext,
        parent,
        icon
      } = item;

      // Create the container for the option (list element)
      const option = document.createElement("li");
      option.classList = classes.item;
      // Set the option's value as the ID
      // option.setAttribute("id", id);
      // Show the option label
      const labelEl = document.createElement("span");
      labelEl.textContent = label;
      option.appendChild(labelEl);

      // Insert the icon, if there is one, before the item label
      if (icon) {
        // Make a copy of the icon, so we're not editing the icon that's stored in the
        // array of data.
        const itemIcon = icon.cloneNode(true);
        itemIcon.classList.add(classes.itemIcon)
        option.prepend(itemIcon);
      }

      // Add addition text to the option, if there is any
      if (subtext) {
        const subtextEl = document.createElement("span");
        subtextEl.classList = classes.subtext;
        subtextEl.textContent = `(${subtext})`;
        option.appendChild(subtextEl);
      }

      if (parent) {
        option.classList.add(classes.childItem)
      }

      // When the list element is clicked (selected), show it as selected
      option.addEventListener("click", function () {
        selectOption(item)
      } );
      
      // Add the item/option to the list of options.
      list.appendChild(option);
      // Also append it to them corresponding data. (This makes it easier for child
      // elements to access their parent's html.)
      item.listItemEl = option;

    });
    return list;
  };

  // Given the ID of an item/option, return the complete item object with label, id, icon,
  // etc.
  function getItemById(id) {
    return data.find(item => item.id === id);
  }

  // Given the ID of an item/option, get the user-facing label. Returns the label string.
  function getLabelById(id) {
    let label = null;
    const selectedItem = getItemById(id)
    if (selectedItem) {
      label = selectedItem.label
    }
    return label
  }

  // Show or hide the dropdown list
  function toggleDropdown() {
    list.classList.toggle(classes.listHidden);
    input.classList.toggle(classes.inputActive);
  };

  // When a dropdown item/option is selected, trigger an event and change the placeholder
  // text. The entire item object with id, label, icon, etc. is passed to this function.
  function selectOption(item) {
    if (!item.id) {
      return
    }
    if (!item.label) {
      item.label = getLabelById(id)
      if (!item.label) {
        return
      }
    }

    let selectedHTML = item.listItemEl.cloneNode(true);

    // If the item has a parent, and no icon, use the parent's icon and html.
    if (item.parent && !item.icon) {
      const parent = getItemById(item.parent);
      if (parent && parent.listItemEl) {
        let parentHTML = parent.listItemEl.cloneNode(true);
        // Get the element of the parent that contains the label. Assumes it's in the span
        // element, and there's only one span. Add a separator between parent label and
        // child label.
        const textEl = parentHTML.getElementsByTagName("span")[0];
        textEl.innerHTML += ":&nbsp";
        parentHTML.appendChild(selectedHTML.childNodes[0])
        selectedHTML = parentHTML
      }
    }
    // Update the placeholder text
    const placeholderTextEl = input.querySelector('.' + classes.placeholderText);
    placeholderTextEl.innerHTML = selectedHTML.innerHTML;
    // Dispatch a the change event
    const changeEvent = new CustomEvent(
      'update',
      {
        detail:
        {
          id: item.id,
          label: item.label
        }
      }
    );
    dropdown.dispatchEvent(changeEvent);
    // Close the dropdown list
    toggleDropdown();
  };

  // Return the HTML element
  return dropdown

};

export default enhancedDropdown