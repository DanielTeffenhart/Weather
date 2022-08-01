const populateHTML = (currentWeatherJSON) => {
    // Current weather
    const currentWeatherElement = document.getElementById('cweather').firstElementChild;
    const strongElement = document.createElement('strong');
    strongElement.innerHTML = 'CURRENT WEATHER - ' + currentWeatherJSON.name.toString().toUpperCase();
    currentWeatherElement.appendChild(strongElement);
    const time = new Date().toLocaleDateString([], {hour: '2-digit', minute: '2-digit'});
    const dateTimeElement = document.getElementById('date-time');
    dateTimeElement.innerHTML = time;
    const temperatureElement = document.getElementById('temperature').firstElementChild;
    temperatureElement.innerHTML = currentWeatherJSON.main.temp.toString().split('.')[0] + '°F';
    const conditionElement = document.getElementById('condition').firstElementChild;
    conditionElement.innerHTML = currentWeatherJSON.weather[0].description.toUpperCase();
    const feelingElement = document.getElementById('feeling').firstElementChild;
    feelingElement.innerHTML = 'FEELS LIKE ' + currentWeatherJSON.main.feels_like.toString().split('.')[0] + '°F';
    const iconElement = document.getElementById('weather-icon').firstElementChild;
    const iconCode = currentWeatherJSON.weather[0].icon;
    iconElement.setAttribute('src', `http://openweathermap.org/img/wn/${iconCode}@2x.png`);
    const cloudinessElement = document.getElementById('cloudiness').lastElementChild;
    cloudinessElement.innerHTML = currentWeatherJSON.clouds.all.toString() + '%';
    const windSpeedElement = document.getElementById('wind').lastElementChild;
    windSpeedElement.innerHTML = currentWeatherJSON.wind.speed.toString() + 'MPH';
    const humidityElement = document.getElementById('humidity').lastElementChild;
    humidityElement.innerHTML = currentWeatherJSON.main.humidity.toString() + '%';
    const visibilityElement = document.getElementById('visibility').lastElementChild;
    visibilityElement.innerHTML = (currentWeatherJSON.visibility / 1000) + 'km';
    const pressureElement = document.getElementById('pressure').lastElementChild;
    pressureElement.innerHTML = currentWeatherJSON.main.pressure + 'hPa';
}

const callWeatherAPI = async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiKey = '31f4783a5eabbdaf8545239f6c81512a';
    const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`);
    const currentWeatherJSON = await currentWeatherResponse.json();
    populateHTML(currentWeatherJSON);
    
    // Fade in
    const mainContainer = document.getElementById('main-container');
    mainContainer.style.animationName = 'fade-in';
    mainContainer.style.animationDuration = '250ms';
    mainContainer.style.animationFillMode = 'forwards';
}

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => callWeatherAPI(position));
    } else {
        alert('Error fetching location data');
    }
}

const main = () => {
    getLocation();
}

main();