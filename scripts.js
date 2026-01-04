// function to update background image depending upon the weather
const backgroundImage = document.querySelector('.background');

function updateBackground(weatherType) {
    // Clear existing images to prevent memory leak
    backgroundImage.innerHTML = '';

    const imgElement = document.createElement('img');

    if (weatherType == 'clear-day') {
        imgElement.src = 'imgs/clear.jpg';
    }

    else if (weatherType == 'clear-night') {
        imgElement.src = 'imgs/nightClear.jpg';
    }

    else if (weatherType == 'partly-cloudy-day') {
        imgElement.src = 'imgs/partlyCloudy.jpg';
    }

    else if (weatherType == 'partly-cloudy-night') {
        imgElement.src = 'imgs/cloudyNight.jpg';
    }

    else if (weatherType == 'cloudy') {
        imgElement.src = 'imgs/overCast.jpg';
    }

    else if (weatherType == 'rain') {
        imgElement.src = 'imgs/rain.jpg';
    }

    else if (weatherType == 'snow') {
        imgElement.src = 'imgs/snow.jpg';
    }

    else if (weatherType == 'sleet') {
        imgElement.src = 'imgs/sleet.jpg';
    }

    else if (weatherType == 'wind') {
        imgElement.src = 'imgs/wind.jpg';
    }

    else if (weatherType == 'fog') {
        imgElement.src = 'imgs/fog.jpg';
    }

    else if (weatherType == 'hail') {
        imgElement.src = 'imgs/hail.jpg';
    }

    else if (weatherType == 'thunderstorm') {
        imgElement.src = 'imgs/thunderStorm.jpg';
    };

    backgroundImage.appendChild(imgElement);
};

// Opening and Closing the Pop Up Form
const openFormButton = document.querySelector('.changeLocation');
const closeFormButton = document.querySelector('.closeBtn');
const overlay = document.getElementById('overlay');
const form = document.querySelector('.popUpForm');

function openForm(form) {
    if (form == null) return
    form.classList.add('active');
    overlay.classList.add('active');
}

function closeForm(form) {
    if (form == null) return
    form.classList.remove('active');
    overlay.classList.remove('active');
}

openFormButton.addEventListener('click', () => {
    openForm(form);
});

closeFormButton.addEventListener('click', () => {
    closeForm(form);
});

overlay.addEventListener('click', () => {
    const form = document.querySelector('.popUpForm.active');
    closeForm(form);
});

// Changing Location using form
const countryInput = document.getElementById('countryInput');
const cityInput = document.getElementById('cityInput');
const submitFormBtn = document.querySelector('.submitLocation');

function changeLocation (country, city) {
    currentLocation = `${city}, ${country}`
}
submitFormBtn.addEventListener('click', () => {
    // Only submit if both fields have values
    if (countryInput.value.trim() && cityInput.value.trim()) {
        // Change the location
        changeLocation(countryInput.value.trim(), cityInput.value.trim());
        // Fetch and display the new weather data based on the new location
        init();
        // Close the form
        closeForm(form);
        // Clear the input fields
        countryInput.value = '';
        cityInput.value = '';
    } else {
        alert('Please enter both city and country!');
    }
});

// API Integration
let currentLocation = 'Philadelphia,US'; // default Val
let unitGroup = 'metric' // default Value
let url = '';

const API_KEY = 'ZHXBPT9DDGVWTDFZUSD6XVSDR';
// specific data feilds
const elements = ['temp', 'tempmax', 'tempmin', 'aqius', 'windspeed', 'windgust', 'winddir', 'precip', 'sunrise', 'sunset', 'uvindex', 'humidity', 'icon'];
const include = ['current', 'alerts'];

// Build URL dynamically
const buildURL = () => {
    url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(currentLocation)}/today?key=${API_KEY}&include=${include.join(',')}&elements=${elements.join(',')}&unitGroup=${unitGroup}`;
}

// Fetch Data from API
async function getWeather() {
    try {
        buildURL();
        const response = await fetch(url);
        const data = await response.json();
        // if there is an error
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return data;
    } 
    catch (error) {
        console.error('Failed to fetch weather:', error);
        return null;
    }
}

/// HELPER FUNCTIONS
// Time Converter
function formatTime12hr(timeString) {
  let [hours, minutes] = timeString.split(':');
  hours = parseInt(hours);
  
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // converts 0 to 12, and 13-23 to 1-11
  
  return `${hours}:${minutes} ${period}`;
}

const displayValue = (value, suffix = '') => {
    return value !== null && value !== undefined ? value + suffix : 'No Data';
}

const extractWhatSection = (description) => {
    if (!description) return 'No alert information';
    // Get the WHAT section
    const whatSection = description.split('\n\n')[0];
    // Remove the "* WHAT..." prefix and replace newlines with spaces first
    const cleanText = whatSection.replace('* WHAT...', '').replace(/\n/g, ' ').trim();
    // Get just the first sentence (up to the first period)
    const firstSentence = cleanText.split(/\.\s+/)[0] + '.';

    // Add line break after ~45 characters at the nearest word boundary
    const maxChars = 45;
    if (firstSentence.length > maxChars) {
        const breakPoint = firstSentence.lastIndexOf(' ', maxChars);
        if (breakPoint > 0) {
            return firstSentence.slice(0, breakPoint) + '<br>' + firstSentence.slice(breakPoint + 1);
        }
    }

    return firstSentence;
}

// Display Data from API
function displayWeather(data) {
    // if no data available from api, return
    if (!data) return;
    
    // Get data points
    const cTemp = data.currentConditions.temp;    
    const TempMax = data.days[0].tempmax;
    const TempMin = data.days[0].tempmin;
    const cAirQual = data.currentConditions.aqius;
    const cWindSpeed = data.currentConditions.windspeed;
    const cWindGust = data.currentConditions.windgust;
    const cWindDir = data.currentConditions.winddir;
    const cPrcp = data.currentConditions.precip;
    const cSunRise = data.currentConditions.sunrise;
    const cSunSet = data.currentConditions.sunset;
    const cUvIndex = data.currentConditions.uvindex;
    const cHumidity = data.currentConditions.humidity;
    const bgIcon = data.currentConditions.icon;
    // Alert data(if available):
    const alertEvent = data.alerts?.[0]?.event ?? 'No active alerts';
    const alertDesc = extractWhatSection(data.alerts?.[0]?.description);
    // update the background Image
    updateBackground(bgIcon);

    // Update DOM to show data
    // Use resolvedAddress for better formatting (e.g., "Philadelphia, PA, United States")
    const cityName = data.resolvedAddress.split(',')[0].trim();
    document.querySelector('.Location').textContent = cityName;
    document.querySelector('.Temperature').innerHTML = displayValue(cTemp, '°');
    document.querySelector('.highTemp').innerHTML ='<div>H:</div>' + displayValue(TempMax, '°');
    document.querySelector('.lowTemp').innerHTML = '<div>L:</div>' + displayValue(TempMin, '°');
    document.querySelector('.qualityNum').textContent = displayValue(cAirQual);
    
    // Air Quality Identification
    let aqiID = ''
    if (cAirQual == 'null') {
        aqiID = ' '
    }
    else if (cAirQual <= 50) {
        aqiID = 'Good';
    }
    else if (cAirQual >= 51 && cAirQual <= 100) {
        aqiID = 'Moderate';
    }
    else if (cAirQual >= 101 && cAirQual <= 150) {
        aqiID = 'Unhealthy for Sensitive Groups';
    }
    else if (cAirQual >= 151 && cAirQual <= 200) {
        aqiID = 'Unhealthy';
    }
    else { aqiID = 'Hazardous'; }
    
    document.querySelector('.qualityIdentification').textContent = aqiID;

    // Change the speed units deoending on the unit group
    if (unitGroup == 'metric') {  // km/h
        document.querySelector('.windNum').innerHTML = '<div>Wind:</div>' + displayValue(cWindSpeed, ' km/h');
        document.querySelector('.gustNum').innerHTML = '<div>Gusts:</div>' + displayValue(cWindGust, ' km/h');
    }
    else if (unitGroup == 'us') {  // mp/h
        document.querySelector('.windNum').innerHTML = '<div>Wind:</div>' + displayValue(cWindSpeed, ' mp/h');
        document.querySelector('.gustNum').innerHTML = '<div>Gusts:</div>' + displayValue(cWindGust, ' mp/h');
    }
    
    document.querySelector('.directionNum').innerHTML = '<div>Direction:</div>' + displayValue(cWindDir, '°');
    document.querySelector('.prcpNum').innerHTML = displayValue(cPrcp, 'mm');
    document.querySelector('.sunriseTime').innerHTML = '<div>Sunrise:</div>' + displayValue(formatTime12hr(cSunRise));
    document.querySelector('.sunsetTime').innerHTML = '<div>Sunset:</div>' + displayValue(formatTime12hr(cSunSet));
    document.querySelector('.uvNum').textContent = displayValue(cUvIndex);

    // UV Index Classification
    let uvClass = '';
    if (cUvIndex == 'null') {
        uvClass = ' ';
    }
    else if (cUvIndex <= 2) {
        uvClass = 'Low';
    }
    else if (cUvIndex >= 3 && cUvIndex <= 5) {
        uvClass = 'Moderate';
    }
    else if (cUvIndex >= 6 && cUvIndex <= 7) {
        uvClass = 'High';
    }
    else { uvClass = 'Very High'; }

    document.querySelector('.uvClassification').textContent = uvClass;
    document.querySelector('.humidityNum').textContent = displayValue(cHumidity, '%');

    // Humidity Classification
    let humidityClass = '';
    if (cHumidity == 'null') {
        humidityClass = ' ';
    }
    else if (cHumidity < 50) {
        humidityClass = 'Low';
    }
    else if (cHumidity >= 50 && cHumidity <= 80) {
        humidityClass = 'High';
    }
    else { humidityClass = 'Very High'; }

    document.querySelector('.humidityClassification').textContent = humidityClass;

    // Alert Info (if Available)
    document.querySelector('.alert').innerHTML = `<div class="card-value">${alertEvent}</div>` + `<div class="card-label">${alertDesc}</div>`;
}

// Controller
async function init() {
    const data = await getWeather();
    displayWeather(data);
}

// Changing the temprature form F to C and vice versa
const toggleTempBtn = document.querySelector('.tempToggle');
let TempFlag = 'C'; // default value received from API

toggleTempBtn.addEventListener('click', () => {
    // ensure that if location is changed, it is recorded before re-fetching data
    const nowLocation = currentLocation;
    // Check if metric:
    if (unitGroup == 'metric') {
        unitGroup = 'us';
        currentLocation = nowLocation;
        TempFlag = 'F';
        // re-fetch and display the data in imperial
        init();
    }
    else if (unitGroup == 'us') {
        unitGroup = 'metric';
        currentLocation = nowLocation;
        TempFlag = 'C';
        init();
    }
});

init();