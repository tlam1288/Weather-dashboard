var searchCity = $("#searchCity").val();

function weather() {
  var apiKey = "&appid=3c85c1039b089f52f3c466c42a12368f";
  var searchCity = $("#searchCity").val();
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=" +
    searchCity +
    apiKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var newSearchP = $("<div>")
      .attr("class", "card p-2 searchNumber")
      .text(searchCity);
    $("#searchForm").append(newSearchP);

    //current city weather
    var name = response.name;
    var nameElem = $("<h2>").text(name);

    var temperature = response.main.temp;
    var tempElem = $("<p>").text("Temperature: " + temperature);

    var humidity = response.main.humidity;
    var humidityElem = $("<p>").text("Humidity: " + humidity);

    var windSpeed = response.wind.speed;
    var windElem = $("<p>").text("Wind Speed: " + windSpeed);

    $("#currentWeather").empty();
    $("#currentWeather").append(nameElem, tempElem, humidityElem, windElem);

    //ends currentCIty funtion
    //get lat and long to find UV index
    var longitude = "&lon=" + response.coord.lon;
    var latitude = "&lat=" + response.coord.lat;
    var uvURL =
      "http://api.openweathermap.org/data/2.5/uvi?&units=imperial" +
      latitude +
      longitude +
      apiKey;

    $.ajax({
      url: uvURL,
      method: "GET",
    }).then(function (uvindex) {
      var uvIndex = parseInt(uvindex.value);
      var uvElem = $("<p>").html("UV Index:  <span>" + uvIndex + "</span>");

      $("#currentWeather").append(uvElem);

      if (uvIndex >= 10) {
        $("span").css("background-color", "red");
      } else if (uvIndex <= 2) {
        $("span").css("background-color", "green");
      } else if (uvIndex > 2 && uvIndex < 10) {
        $("span").css("background-color", "yellow");
      }
    });
  });

  //5 day forecast
  var forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&q=" +
    searchCity +
    apiKey;

  $.ajax({
    url: forecastURL,
    method: "GET",
  }).then(function (forecast) {
    var forecasts = forecast.list;

    $("#5dayForecast").empty();
    for (var i = 0; i < forecasts.length; i++) {
      var forecastDate = $("<p>").text(
        forecasts[i].dt_txt.replace("00:00:00", " ")
      );
      var forecastCondition = $("<p>").text(forecasts[i].weather[0].main);
      var forecastTemp = $("<p>").text("Temp: " + forecasts[i].main.temp);
      var forecastHumidity = $("<p>").text(
        "Humidity: " + forecasts[i].main.humidity
      );

      //displays each day separately
      if ([i] % 8 === 0) {
        var newDiv = $("<div>").attr("class", "col card mr-3 forecast");
        newDiv.append(
          forecastDate,
          forecastCondition,
          forecastTemp,
          forecastHumidity
        );

        $("#5dayForecast").append(newDiv);
      }
    } // closes for loop
  }); // closes ajax call
}
var storage = [];
function storageData() {
  var apiKey = "&appid=3c85c1039b089f52f3c466c42a12368f";
  var searchCity = $("#searchCity").val();
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=" +
    searchCity +
    apiKey;
  storage.push(searchCity);

  console.log(storage);
  localStorage.setItem("city", JSON.stringify(storage));

  var savedSearch = JSON.parse(localStorage.getItem("city"));
  renderSavedSearch = savedSearch[savedSearch.length - 1];
  console.log(renderSavedSearch);
  weather();
}

$("button").on("click", function () {
  weather();
  storageData();
});