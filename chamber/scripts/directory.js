const url = "data/members.json";
const container = document.querySelector('#members-container');
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');

// 1. Fetch the Data
async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
}

// 2. Build the Cards
function displayMembers(members) {
    container.innerHTML = ""; // Clear current view
    members.forEach(member => {
        let card = document.createElement('section');
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        container.appendChild(card);
    });
}

// 3. Toggle View Listeners
gridBtn.addEventListener('click', () => {
    container.classList.add('grid-view');
    container.classList.remove('list-view');
});

listBtn.addEventListener('click', () => {
    container.classList.add('list-view');
    container.classList.remove('grid-view');
});

// 4. Footer Dates
document.querySelector('#currentYear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = document.lastModified;

getMembers();
