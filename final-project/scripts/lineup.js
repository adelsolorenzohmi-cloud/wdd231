const grid = document.querySelector('#artist-grid');
const modal = document.querySelector('#artist-modal');
const modalInfo = document.querySelector('#modal-info');

async function loadLineup() {
    const resp = await fetch('data/artists.json');
    const artists = await resp.json();

    artists.forEach(artist => {
        const card = document.createElement('div');
        card.className = 'info-card';
        card.innerHTML = `
            <h3>${artist.name}</h3>
            <div class="card-content">
                <img src="${artist.image}" alt="${artist.name}" style="width:100%; border-radius:4px;">
                <p><strong>${artist.genre}</strong></p>
                <button class="open-modal" data-id="${artist.id}" style="padding:10px; cursor:pointer;">Learn More</button>
            </div>
        `;
        grid.appendChild(card);
    });

    document.querySelectorAll('.open-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const artist = artists.find(a => a.id == btn.dataset.id);
            modalInfo.innerHTML = `<h2>${artist.name}</h2><p>${artist.bio}</p><p><strong>Origin:</strong> ${artist.country}</p>`;
            modal.showModal();
        });
    });
}

document.querySelector('#close-modal').addEventListener('click', () => modal.close());
loadLineup();