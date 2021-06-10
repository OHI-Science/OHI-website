/**
 * A string that selects the top level nav links
 */
const topLevelLinkSelector = ".menu__link"
/**
 * The node list of top level nav links
 */
const topLevelLinks = document.querySelectorAll(topLevelLinkSelector)


// Make the navbar more accessible for keyboard users by adding a class that shows
// the link that is focused. This will execute when this file (nav.js) is imported.
topLevelLinks.forEach(link => {
  
  if (link.nextElementSibling) {
    link.addEventListener('focus', function () {
      this.parentElement.classList.add('focus')
    })

    const subMenu = link.nextElementSibling
    const subMenuLinks = subMenu.querySelectorAll('a')
    const lastLinkIndex = subMenuLinks.length - 1
    const lastLink = subMenuLinks[lastLinkIndex]

    lastLink.addEventListener('blur', function () {
      link.parentElement.classList.remove('focus')
    })
  }
})
