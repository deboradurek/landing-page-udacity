/**
 * Global Variables
 *
 */

// Transform all sections in an array
const allSections = Array.from(document.getElementsByTagName('section'));

// Select ul to append li
const menuList = document.querySelector('#navbar__list');

// Set time to hide navBar when no action is detected
let time = null;

// Get button that collapses sections
const buttonCollapse = document.querySelectorAll('.collapse');

/**
 * End Global Variables
 * Begin Main Functions
 *
 */

// Build dynamic navbar and append all menu items
function buildNavBar() {
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
}

// Detect which section is in viewport and set as active
function sectionActive() {
  for (const section of allSections) {
    const box = section.getBoundingClientRect();
    if (box.top <= 170 && box.bottom >= 170) {
      section.classList.add('active-class');
      document.querySelector(`.${section.id}`).classList.add('active-link');
    } else {
      section.classList.remove('active-class');
      document.querySelector(`.${section.id}`).classList.remove('active-link');
    }
  }
}

// Scroll to section on link click
function scrollToView(sectionId) {
  // Returns section id from sectionActive()
  return function (event) {
    const menuListHeight = document.getElementById('navbar__list').offsetHeight;
    const section = document.getElementById(sectionId);
    const [sectionContainerEle] = section.getElementsByClassName(
      'landing__container'
    );
    sectionContainerEle.classList.add('landing__container-expanded');
    event.preventDefault();
    // Scroll smoothly to section considering navBar height
    window.scroll({
      top: section.offsetTop - menuListHeight,
      behavior: 'smooth',
    });
  };
}

// Hide navBar when no action is detected
function hideMenu() {
  menuList.style.display = 'none';
}

// Create button to scroll to top
function buttonToTop() {
  const buttonUp = document.createElement('button');
  buttonUp.classList.add('button-up');
  buttonUp.textContent = 'Top';
  buttonUp.addEventListener('click', goToTop);
  document.body.appendChild(buttonUp);
}

// Scroll to top after user clicks on the created button
function goToTop() {
  document.body.scrollTop = 0; // Safari users
  document.documentElement.scrollTop = 0;
}

// Show button that goes to the top
function showGoToTopButton() {
  const [buttonUp] = document.getElementsByClassName('button-up');
  const offset = window.pageYOffset;
  const pageFold = window.innerHeight / 2;

  if (offset > pageFold) {
    buttonUp.style.display = 'flex';
  } else {
    buttonUp.style.display = 'none';
  }
}

/**
 * End Main Functions
 * Begin Events
 *
 */

/* Event for hiding NavBar Starts */
// Event: scroll event to hide NavBar after 2 seconds if no scroll is detected
window.addEventListener('scroll', function () {
  if (time !== null) {
    menuList.style.display = 'block';
    clearTimeout(time);
  }
  time = setTimeout(hideMenu, 2000);
});

// Event: mousemove event to hide NavBar after 2 seconds if no mousemove is detected
window.addEventListener('mousemove', function () {
  if (time !== null) {
    menuList.style.display = 'block';
    clearTimeout(time);
  }
  time = setTimeout(hideMenu, 2000);
});
/* Event for hiding NavBar Ends */

// Event: scroll event to make both section and link active
// Event: scroll event to go back to top
document.addEventListener('scroll', function () {
  sectionActive();
  showGoToTopButton();
});

// Event: load event to set page on top after refresh
window.addEventListener('beforeunload', goToTop);

// Event: click event to make sections collapsible
buttonCollapse.forEach(function (btn) {
  btn.addEventListener('click', function () {
    const sectionContainerEle = this.nextElementSibling;
    sectionContainerEle.classList.toggle('landing__container-expanded');
  });
});

/**
 * End Events
 * Begin Function Calls
 *
 */

// Build navbar
buildNavBar();

// Scroll to top using button which gets visible only below fold of the page
buttonToTop();

/**
 * End Function Calls
 *
 */
