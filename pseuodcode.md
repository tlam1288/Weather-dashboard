CREATE html page to load the weather app
-need FORM INPUT to search for city
-on submit it will use as a paramater to API
-use bootstrap forms and cards to add forecast
-add search bar with search history below. - searches will be prepended to list

- 1 row grid layout: 2nd column has 2 rows in it. Top is current city, bottom is 5 day forecast

WEATHER API
-needs to show CURRENT and FUTURE conditions
-DISPLAY city name, data, icon that represents weather conditions, temperature, humidity, windspeed, UV Index

- When UV index is displayed, make them color coded to indicate favorable, moderate, severe
  - need to use latitufe and longitude to find UV index. It's called "value"
    response.coord.lon
    response.coord.lat
  - use IF statements to make BACKGROUND COLORS

-city then ADDED to local storage search history

-FUTURE weather forecast:
-show 5 day forecast
include date, icon for weather conditions, temperature, humidity

WHEN city in search history is clicked, THEN current temp and future forecast for that city is displayed

WHEN page is reloaded, last city searched forecast is displayed
