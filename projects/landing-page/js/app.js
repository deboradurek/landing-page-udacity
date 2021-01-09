/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active

const allSections = Array.from(document.getElementsByTagName('section')); // transform all sections in an array

const menuList = document.querySelector('#navbar__list'); // select ul to append li

allSections.forEach(function (section) {
  const menuItem = document.createElement('li'); // create li
  const menuItemLink = document.createElement('a'); // create link
  menuItemLink.textContent = section.dataset.nav; // link text equal to section data-nav
  menuItemLink.setAttribute('href', `#${section.id}`); // set href equal to id
  menuItemLink.classList.add('menu__link'); // add class to link for styling
  menuItem.appendChild(menuItemLink); // append link to li
  menuList.appendChild(menuItem); // append li to ul
});

// Find all links and add a listener to each one:
// ToDo

const allLinks = document.querySelectorAll('a');

allLinks.forEach(function (eachLink) {
  eachLink.addEventListener('click', function () {
    eachLink.classList.add();
    console.log(eachLink.classList);
  });
});

// Detect if section is in viewport

function sectionActive() {
  for (const section of allSections) {
    const box = section.getBoundingClientRect();
    if (box.top <= 150 && box.bottom >= 150) {
      section.classList.add('active-class');
    } else {
      section.classList.remove('active-class');
    }
  }
}

document.addEventListener('scroll', sectionActive);
