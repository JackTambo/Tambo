const apiKey = 'c8e7147eedb770ee8b38edf5b3d97857'; // Replace with your OpenWeatherMap API key

// Function to fetch current weather and forecast data
async function fetchWeatherData(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert('Failed to fetch weather data: ' + error.message);
    }
}

// Function to fetch historical data
async function fetchHistoricalData(lat, lon, time) {
    const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${time}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        displayHistorical(data);
    } catch (error) {
        alert('Failed to fetch historical data: ' + error.message);
    }
}

// Function to display current weather
function displayWeather(data) {
    const weatherDisplay = document.getElementById('weather-display');
    if (data && data.current) {
        weatherDisplay.innerHTML = `
            <h2>Current Weather</h2>
            <p>Temperature: ${data.current.temp} °C</p>
            <p>Weather: ${data.current.weather[0].description}</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind Speed: ${data.current.wind_speed} m/s</p>
        `;
    } else {
        weatherDisplay.innerHTML = '<p>No data available.</p>';
    }
}

// Function to display historical data
function displayHistorical(data) {
    const historicalDisplay = document.getElementById('historical-display');
    if (data && data.current) {
        historicalDisplay.innerHTML = `
            <h3>Historical Data:</h3>
            <p>Temperature: ${data.current.temp} °C</p>
            <p>Weather: ${data.current.weather[0].description}</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind Speed: ${data.current.wind_speed} m/s</p>
        `;
    } else {
        historicalDisplay.innerHTML = '<p>No historical data available.</p>';
    }
}

// Handle search button click
document.getElementById('search-button').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value;
    if (!city) {
        alert('Please enter a city name.');
        return;
    }
    
    // Geocoding API call to get latitude and longitude from city name
    const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(geoUrl);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        const lat = data.coord.lat;
        const lon = data.coord.lon;

        // Fetch current weather and historical data
        fetchWeatherData(lat, lon);
        // Fetch historical data for 24 hours ago (example)
        const historicalTime = Math.floor(Date.now() / 1000) - 86400; // 24 hours ago
        fetchHistoricalData(lat, lon, historicalTime);
    } catch (error) {
        alert('Failed to fetch location data: ' + error.message);
    }
});