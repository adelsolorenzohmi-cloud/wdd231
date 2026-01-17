// Footer dates logic
document.querySelector('#currentYear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Mobile Menu Toggle
const menuBtn = document.querySelector('#menu-toggle');
const nav = document.querySelector('#nav-list');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('show');
    menuBtn.textContent = nav.classList.contains('show') ? 'X' : '☰';
});

// Member Fetching
const url = "data/members.json";
const container = document.querySelector('#members-container');

async function getMembers() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

function displayMembers(members) {
    container.innerHTML = "";
    members.forEach(member => {
        let section = document.createElement('section');
        section.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p class="membership-level">Level: ${member.membership}</p>
        `;
        container.appendChild(section);
    });
}

// Grid/List View Toggle Logic
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');

gridBtn.addEventListener('click', () => {
    container.classList.add('grid-view');
    container.classList.remove('list-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
    container.classList.add('list-view');
    container.classList.remove('grid-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
});

getMembers();