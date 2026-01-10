// Store the selected elements
const navButton = document.querySelector('#hamburger-button');
const navBar = document.querySelector('#nav-bar');

// Toggle the 'show' class for both the button icon and the menu list
navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});