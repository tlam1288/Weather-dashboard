let storage = [];

function getWeather() {
  let apiKey = "&appid=3c85c1039b089f52f3c466c42a12368f";
  let searchCity = $("#searchCity").val();
  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=" +
    searchCity +
    apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then((response) => {
    let newSearchP = $("<div>")
      .attr("class", "card p-2 searchNumber")
      .text(searchCity);
    $("#searchForm").append(newSearchP);

    //current city weather
    let name = response.name;
    let nameElem = $("<h2>").text(name);

    let temperature = response.main.temp;
    let tempElem = $("<p>").text("Temperature: " + temperature + "F");

    let humidity = response.main.humidity;
    let humidityElem = $("<p>").text("Humidity: " + humidity + "%");

    let windSpeed = response.wind.speed;
    let windElem = $("<p>").text("Wind Speed: " + windSpeed + "mph");

    $("#currentWeather").empty();
    $("#currentWeather").append(nameElem, tempElem, humidityElem, windElem);

    //ends currentCIty funtion
    //get lat and long to find UV index
    let longitude = "&lon=" + response.coord.lon;
    let latitude = "&lat=" + response.coord.lat;
    let uvURL =
      "https://api.openweathermap.org/data/2.5/uvi?&units=imperial" +
      latitude +
      longitude +
      apiKey;

    $.ajax({
      url: uvURL,
      method: "GET",
    }).then((uvindex) => {
      let uvIndex = parseInt(uvindex.value);
      let uvElem = $("<p>").html("UV Index:  <span>" + uvIndex + "</span>");

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
  let forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&q=" +
    searchCity +
    apiKey;

  $.ajax({
    url: forecastURL,
    method: "GET",
  }).then((forecast) => {
    let forecasts = forecast.list;

    $("#5dayForecast").empty();
    for (let i = 0; i < forecasts.length; i++) {
      let forecastDate = $("<p>").text(
        forecasts[i].dt_txt.replace("00:00:00", " ")
      );
      let forecastCondition = $("<p>").text(forecasts[i].weather[0].main);
      let forecastTemp = $("<p>").text(
        "Temp: " + forecasts[i].main.temp + " F"
      );
      let forecastHumidity = $("<p>").text(
        "Humidity: " + forecasts[i].main.humidity + "%"
      );

      //displays each day separately
      if ([i] % 8 === 0) {
        let newDiv = $("<div>").attr("class", "col card mr-3 forecast");
        newDiv.append(
          forecastDate,
          forecastCondition,
          forecastTemp,
          forecastHumidity
        );

        $("#5dayForecast").append(newDiv);
      }
    }
  });

  //saves search in local storage
  storage.push(searchCity);
  localStorage.setItem("city", JSON.stringify(storage));
  JSON.parse(localStorage.getItem("city"));
}

//rendering from local storage
let apiKey = "&appid=3c85c1039b089f52f3c466c42a12368f";
let savedSearch = JSON.parse(localStorage.getItem("city"));
if (savedSearch === null) {
  savedSearch = " ";
} else {
  savedSearch = JSON.parse(localStorage.getItem("city"));
}
let renderSavedSearch = savedSearch[savedSearch.length - 1];

let queryURL2 =
  "https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=" +
  renderSavedSearch +
  apiKey;

$.ajax({
  url: queryURL2,
  method: "GET",
}).then((response) => {
  let name = response.name;
  let nameElem = $("<h2>").text(name);

  let temperature = response.main.temp;
  let tempElem = $("<p>").text("Temperature: " + temperature);

  let humidity = response.main.humidity;
  let humidityElem = $("<p>").text("Humidity: " + humidity);

  let windSpeed = response.wind.speed;
  let windElem = $("<p>").text("Wind Speed: " + windSpeed);

  $("#currentWeather").empty();
  $("#currentWeather").append(nameElem, tempElem, humidityElem, windElem);

  let longitude = "&lon=" + response.coord.lon;
  let latitude = "&lat=" + response.coord.lat;
  let uvURL =
    "https://api.openweathermap.org/data/2.5/uvi?&units=imperial" +
    latitude +
    longitude +
    apiKey;

  $.ajax({
    url: uvURL,
    method: "GET",
  }).then((uvindex) => {
    let uvIndex = parseInt(uvindex.value);
    let uvElem = $("<p>").html("UV Index:  <span>" + uvIndex + "</span>");

    $("#currentWeather").append(uvElem);

    if (uvIndex >= 10) {
      $("span").css("background-color", "red");
    } else if (uvIndex <= 2) {
      $("span").css("background-color", "green");
    } else if (uvIndex > 2 && uvIndex < 10) {
      $("span").css("background-color", "yellow");
    }
  });

  let forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&q=" +
    savedSearch +
    apiKey;

  $.ajax({
    url: forecastURL,
    method: "GET",
  }).then((forecast) => {
    let forecasts = forecast.list;

    $("#5dayForecast").empty();
    for (let i = 0; i < forecasts.length; i++) {
      let forecastDate = $("<p>").text(
        forecasts[i].dt_txt.replace("00:00:00", " ")
      );
      let forecastCondition = $("<p>").text(forecasts[i].weather[0].main);
      let forecastTemp = $("<p>").text("Temp: " + forecasts[i].main.temp);
      let forecastHumidity = $("<p>").text(
        "Humidity: " + forecasts[i].main.humidity
      );

      //displays each day separately
      if ([i] % 8 === 0) {
        let newDiv = $("<div>").attr("class", "col card mr-3 forecast");
        newDiv.append(
          forecastDate,
          forecastCondition,
          forecastTemp,
          forecastHumidity
        );

        $("#5dayForecast").append(newDiv);
      }
    }
  });
});

//search for current weather
$("button").on("click", function () {
  getWeather();
});
