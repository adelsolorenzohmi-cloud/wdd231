import { items } from '../data/discover.mjs';

// --- 1. POPULATE DISCOVER CARDS ---
const gridContainer = document.querySelector('#discover-grid');

function displayItems(itemsList) {
    // Clear container once before starting the loop
    gridContainer.innerHTML = "";

    itemsList.forEach((item, index) => {
        // Create the section element for the card
        const card = document.createElement('section');
        card.classList.add('discover-card');

        // Unique ID for grid-template-areas targeting
        card.id = `area${index + 1}`;

        // Build the card structure
        card.innerHTML = `
            <h2>${item.title}</h2>
            <figure>
                <img src="${item.image}" alt="${item.title}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button class="learn-more">Learn More</button>
        `;

        // Add card to the grid container
        gridContainer.appendChild(card);
    });
}

// --- 2. LOCALSTORAGE VISITOR MESSAGE ---
const visitDisplay = document.querySelector("#visitor-message");

function setVisitorMessage() {
    const msPerDay = 1000 * 60 * 60 * 24;
    const lastVisit = window.localStorage.getItem("lastVisit-ls");
    const today = Date.now();

    if (!lastVisit) {
        // First time visit
        visitDisplay.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        // Calculate difference in days
        const daysPassed = (today - parseInt(lastVisit)) / msPerDay;

        if (daysPassed < 1) {
            visitDisplay.textContent = "Back so soon! Awesome!";
        } else {
            const roundedDays = Math.floor(daysPassed);
            const dayText = roundedDays === 1 ? "day" : "days";
            visitDisplay.textContent = `You last visited ${roundedDays} ${dayText} ago.`;
        }
    }

    // Always update localStorage with the current visit time
    localStorage.setItem("lastVisit-ls", today);
}

// --- 3. FOOTER DATES ---
function setFooterInfo() {
    const yearSpan = document.querySelector("#currentYear");
    const modSpan = document.querySelector("#lastModified");

    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (modSpan) modSpan.textContent = `Last Modified: ${document.lastModified}`;
}

// --- INITIALIZE PAGE ---
document.addEventListener("DOMContentLoaded", () => {
    displayItems(items);
    setVisitorMessage();
    setFooterInfo();
});