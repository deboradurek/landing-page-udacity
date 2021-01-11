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

// Transform all sections in an array
const allSections = Array.from(document.getElementsByTagName('section'));

// Select ul to append li
const menuList = document.querySelector('#navbar__list');

// Build dynamic navbar and append all menu items
allSections.forEach(function (section) {
  const menuItem = document.createElement('li');
  const menuItemLink = document.createElement('a');
  menuItemLink.textContent = section.dataset.nav;
  menuItemLink.setAttribute('href', `#${section.id}`);
  menuItemLink.classList.add('menu__link');
  menuItemLink.classList.add(section.id);
  menuItemLink.addEventListener('click', scrollToView(section.id));
  menuItem.appendChild(menuItemLink);
  menuList.appendChild(menuItem);
});

// Detect which section is in viewport and add active classes to Section and Menu Item

function sectionActive() {
  for (const section of allSections) {
    const box = section.getBoundingClientRect();
    if (box.top <= 150 && box.bottom >= 150) {
      section.classList.add('active-class');
      document.querySelector(`.${section.id}`).classList.add('active-link');
    } else {
      section.classList.remove('active-class');
      document.querySelector(`.${section.id}`).classList.remove('active-link');
    }
  }
}

document.addEventListener('scroll', sectionActive);

// Scroll to anchor ID using scrollTO event

function scrollToView(sectionId) {
  // Returns section id from sectionActive()
  return function (event) {
    const menuListHeight = document.getElementById('navbar__list').offsetHeight;
    const section = document.getElementById(sectionId);

    event.preventDefault();
    // Scroll smoothly to section considering navBar height
    window.scroll({
      top: section.offsetTop - menuListHeight,
      behavior: 'smooth',
    });
  };
}

// Hide navBar when no action is detected

// Set time
let time = null;

// Hides navBar
function hideMenu() {
  menuList.style.display = 'none';
}

// NavBar hides after 2 seconds if no scroll is detected
window.addEventListener('scroll', function () {
  if (time !== null) {
    menuList.style.display = 'block';
    clearTimeout(time);
  }
  time = setTimeout(hideMenu, 2000);
});

// NavBar hides after 2 seconds if no mousemove is detected
window.addEventListener('mousemove', function () {
  if (time !== null) {
    menuList.style.display = 'block';
    clearTimeout(time);
  }
  time = setTimeout(hideMenu, 2000);
});

// Scroll to top using button which gets visible only below fold of the page

// Create button to scroll to top
function buttonToTop() {
  const offset = window.pageYOffset;
  const pageFold = window.innerHeight / 2;
  const buttonUp = document.createElement('button');
  buttonUp.classList.add('button-up');
  buttonUp.textContent = 'Top';
  buttonUp.addEventListener('click', goToTop);
  document.body.appendChild(buttonUp);

  if (offset > pageFold) {
    buttonUp.style.display = 'flex';
  } else {
    buttonUp.style.display = 'none';
  }
}

// Scroll to top after user clicks on the created button
function goToTop() {
  document.body.scrollTop = 0; // For Safari users
  document.documentElement.scrollTop = 0;
}

buttonToTop();

document.addEventListener('scroll', function () {
  const [buttonUp] = document.getElementsByClassName('button-up');
  const offset = window.pageYOffset;
  const pageFold = window.innerHeight / 2;
  console.log(offset);
  console.log(pageFold);
  if (offset > pageFold) {
    buttonUp.style.display = 'flex';
  } else {
    buttonUp.style.display = 'none';
  }
});
