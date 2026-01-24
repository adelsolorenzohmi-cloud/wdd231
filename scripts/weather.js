// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=6d21db5e68422d5a30a4fbad7afe26a3';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); //
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    // 1. Display temperature rounded to 0 decimal places
    currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;F`;

    // 2. Build the icon source URL
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // 3. Get the weather description
    let desc = data.weather[0].description;

    // 4. Set the image attributes and figcaption text
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
}

apiFetch();