const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityInput = document.querySelector('#city-input');

search.addEventListener('click', () => {
    const APIKey = ''; // No API key needed on frontend, backend handles it
    const city = cityInput.value;

    if (city === '')
        return;

    container.classList.add('loading');
    container.classList.remove('active', 'error');

    fetch(`http://localhost:8080/api/weather/${city}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(json => {
            container.classList.remove('loading');

            if (json.cod === '404') { // This logic depends on backend response structure for error
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                container.classList.add('error');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Map weather condition to icons (simple mapping)
            const condition = json.condition.toLowerCase();
            if (condition.includes('clear') || condition.includes('sunny')) {
                image.src = 'https://cdn-icons-png.flaticon.com/512/6974/6974833.png';
            } else if (condition.includes('rain')) {
                image.src = 'https://cdn-icons-png.flaticon.com/512/3351/3351979.png';
            } else if (condition.includes('snow')) {
                image.src = 'https://cdn-icons-png.flaticon.com/512/642/642102.png';
            } else if (condition.includes('cloud')) {
                image.src = 'https://cdn-icons-png.flaticon.com/512/414/414825.png';
            } else if (condition.includes('mist') || condition.includes('fog')) {
                image.src = 'https://cdn-icons-png.flaticon.com/512/4005/4005901.png';
            } else {
                image.src = 'https://cdn-icons-png.flaticon.com/512/414/414825.png';
            }

            temperature.innerHTML = `${Math.round(json.temperature)}<span>°C</span>`;
            description.innerHTML = `${json.condition}`;
            humidity.innerHTML = `${json.humidity}%`;
            wind.innerHTML = `${Number(json.windSpeed).toFixed(1)} Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.classList.add('active');
            container.classList.remove('error');
            container.style.height = '590px';


        })
        .catch(error => {
            container.classList.remove('loading');
            container.classList.add('error');
            container.classList.remove('active');
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            console.error('Error:', error);
        });
});

// Enable Enter key for search
cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("search-btn").click();
    }
});
