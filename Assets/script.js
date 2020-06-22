var apiKey = "&appid=3c85c1039b089f52f3c466c42a12368f";
var searchCity = "San Diego"; //$("#searchCity").val();

var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + apiKey;

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
});
