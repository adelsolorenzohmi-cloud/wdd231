import { items } from '../data/discover.mjs';

// --- 1. POPULATE DISCOVER CARDS ---
const gridContainer = document.querySelector('#discover-grid');

function displayItems(items) {
    items.forEach((item, index) => {
        let card = document.createElement('section');
        card.classList.add('discover-card');
        // Setting individual ID for Grid Area targeting
        card.id = `item-${index + 1}`;

        card.innerHTML = `
            <h2>${item.title}</h2>
            <figure>
                <img src="${item.image}" alt="${item.title}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button>Learn More</button>
        `;
        gridContainer.appendChild(card);
    });
}

// --- 2. LOCALSTORAGE VISITOR MESSAGE ---
const visitDisplay = document.querySelector("#visitor-message");
const msPerDay = 1000 * 60 * 60 * 24;
const lastVisit = window.localStorage.getItem("lastVisit-ls");
const today = Date.now();

function setVisitorMessage() {
    if (!lastVisit) {
        visitDisplay.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysPassed = (today - lastVisit) / msPerDay;

        if (daysPassed < 1) {
            visitDisplay.textContent = "Back so soon! Awesome!";
        } else {
            const roundedDays = Math.floor(daysPassed);
            const dayText = roundedDays === 1 ? "day" : "days";
            visitDisplay.textContent = `You last visited ${roundedDays} ${dayText} ago.`;
        }
    }
    // Store current visit for next time
    localStorage.setItem("lastVisit-ls", today);
}

// Initialize
displayItems(items);
setVisitorMessage();

// Footer Dates
document.querySelector("#currentYear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;