$("button").on("click", function () {
  var apiKey = "&appid=3c85c1039b089f52f3c466c42a12368f";
  var searchCity = $("#searchCity").val();
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    var newSearchP = $("<p>").text(searchCity);
    $("#searchForm").append(newSearchP);

    var name = response.name;
    var nameElem = $("<h2>").text(name);

    var temperature = response.main.temp;
    var fConvert = ((temperature - 273.15) * 1.8 + 32).toFixed(2);
    var tempElem = $("<p>").text("Temperature: " + fConvert);

    var humidity = response.main.humidity;
    var humidityElem = $("<p>").text("Humidity: " + humidity);

    var windSpeed = response.wind.speed;
    var windElem = $("<p>").text("Wind Speed: " + windSpeed);

    $("#currentWeather").empty();
    $("#currentWeather").append(nameElem, tempElem, humidityElem, windElem);

    //get lat and long to find UV index
    var longitude = "&lon=" + response.coord.lon;
    var latitude = "&lat=" + response.coord.lat;
    var uvURL =
      "http://api.openweathermap.org/data/2.5/uvi?" +
      latitude +
      longitude +
      apiKey;

    $.ajax({
      url: uvURL,
      method: "GET",
    }).then(function (uvindex) {
      console.log(uvindex);
      var uvIndex = uvindex.value;
      var uvElem = $("<p>").text("UV Index: " + uvIndex);
      $("#currentWeather").append(uvElem);
    });
  });

  //5 day forecast
  var forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + apiKey;

  $.ajax({
    url: forecastURL,
    method: "GET",
  }).then(function (forecast) {
    console.log(forecast);
    var forecasts = forecast.list;

    for (var i = 0; i < forecasts.length; i++) {
      var forecastDate = forecasts[i].dt_txt;
      var forecastCondition = forecasts[i].weather[0].main;
      var forecastTemp = forecasts[i].main.temp;
      var fForecastConvert = ((forecastTemp - 273.15) * 1.8 + 32).toFixed(2);
      var forecastHumidity = forecasts[i].main.humidity;

      //displays each day separately
      if ([i] % 8 === 0) {
        console.log(forecastDate);
        console.log(forecastCondition);
        console.log(fForecastConvert);
        console.log(forecastHumidity);
      }

      //console.log(fForecastConvert);

      var newDiv = $("<div>").append(forecastDate);
      $("#5dayForecast").append(newDiv);
    } // closes for loop
  });
});
