# Weather App

A dynamic weather application that displays current weather conditions with beautiful background images that change based on the weather.

## About This Project

This project was created as an exercise in my learning journey of full-stack development from [The Odin Project](https://www.theodinproject.com/).

## Features

- **Real-time Weather Data**: Fetches current weather conditions using the Visual Crossing Weather API
- **Dynamic Backgrounds**: Background images change based on weather conditions (clear, cloudy, rain, snow, fog, etc.)
- **Location Search**: Search weather for any city worldwide
- **Temperature Toggle**: Switch between Celsius and Fahrenheit
- **Comprehensive Weather Info**:
  - Current temperature with high/low
  - Air quality index
  - Wind speed, gusts, and direction
  - Precipitation
  - Sunrise and sunset times
  - UV index
  - Humidity levels
  - Weather alerts

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Visual Crossing Weather API

## Live Demo

[View Live Demo](https://thechosen-1.github.io/Weather-App/)

## Screenshots

![Weather App Screenshot](imgs/clear.jpg)

## How to Use

1. The app loads with Philadelphia, US as the default location
2. Click "CHANGE LOCATION" to search for a different city
3. Click "TOGGLE TEMPERATURE" to switch between Celsius and Fahrenheit

## A Note on the API Key

I am aware that my API key is exposed in the source code. As a learning project, this is acceptable since Visual Crossing provides rate limiting and some protection on their free tier.

If you want to experiment with this project, you can mitigate API key exposure by:
- Hosting on Vercel or Netlify instead of GitHub Pages (which support serverless functions for hiding API keys)
- Replacing my API key with your own from [Visual Crossing](https://www.visualcrossing.com/)

## What I Learned

- Working with external APIs and handling asynchronous JavaScript
- DOM manipulation and dynamic content updates
- CSS styling for responsive card-based layouts
- Error handling in fetch requests
- Working with weather data and unit conversions

## Acknowledgments

- [The Odin Project](https://www.theodinproject.com/) for the curriculum and guidance
- [Visual Crossing](https://www.visualcrossing.com/) for the Weather API
