import { items } from '../data/discover.mjs';

// --- 1. POPULATE DISCOVER CARDS ---
const gridContainer = document.querySelector('#discover-grid');

function displayItems(itemsList) {
    gridContainer.innerHTML = "";

    itemsList.forEach((item, index) => {
        const card = document.createElement('section');
        card.classList.add('discover-card');
        card.id = `area${index + 1}`;

        card.innerHTML = `
            <h2>${item.title}</h2>
            <figure>
                <img src="${item.image}" alt="${item.title}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button class="learn-more">Learn More</button>
        `;

        gridContainer.appendChild(card);
    });
}

// --- 2. MOBILE MENU TOGGLE ---
function setupHamburgerMenu() {
    const menuBtn = document.querySelector('#menu-toggle');
    const nav = document.querySelector('#nav-list');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('show');
            menuBtn.textContent = nav.classList.contains('show') ? 'X' : '☰';
        });
    }
}

// --- 3. LEARN MORE BUTTON LISTENER ---
function setupLearnMoreListeners() {
    gridContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('learn-more')) {
            const cardTitle = event.target.closest('.discover-card').querySelector('h2').textContent;
            alert(`Discovery details for ${cardTitle} coming soon!`);
        }
    });
}

// --- 4. LOCALSTORAGE VISITOR MESSAGE ---
const visitDisplay = document.querySelector("#visitor-message");

function setVisitorMessage() {
    const msPerDay = 1000 * 60 * 60 * 24;
    const lastVisit = window.localStorage.getItem("lastVisit-ls");
    const today = Date.now();

    if (!lastVisit) {
        visitDisplay.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysPassed = (today - parseInt(lastVisit)) / msPerDay;

        if (daysPassed < 1) {
            visitDisplay.textContent = "Back so soon! Awesome!";
        } else {
            const roundedDays = Math.floor(daysPassed);
            const dayText = roundedDays === 1 ? "day" : "days";
            visitDisplay.textContent = `You last visited ${roundedDays} ${dayText} ago.`;
        }
    }
    localStorage.setItem("lastVisit-ls", today);
}

// --- 5. FOOTER DATES ---
function setFooterInfo() {
    const yearSpan = document.querySelector("#currentYear");
    const modSpan = document.querySelector("#lastModified");

    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (modSpan) modSpan.textContent = `Last Modified: ${document.lastModified}`;
}

// --- INITIALIZE PAGE ---
document.addEventListener("DOMContentLoaded", () => {
    displayItems(items);
    setupHamburgerMenu();
    setupLearnMoreListeners();
    setVisitorMessage();
    setFooterInfo();
});