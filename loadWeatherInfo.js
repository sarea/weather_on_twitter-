var getJSON = require("simple-get-json");

function displayWeatherInfo(city, whichDay, callback) {
  var reply = "Somthing is incorrect! please tweet city name followed by day that you want (today, tomorrow or day after tomorrow)";
  if (city == "none"){
    console.log(reply);
    callback(reply);
  }else{
    var api_url = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+ city +
    "&mode=json&units=kelvin&cnt=7&appid=e71a692c60560a41b511e26e96b775db";
    getJSON(api_url, function(weather){
      var date           = getDayAndDate(weather["list"][whichDay].dt * 1000);
      var location       = weather["city"].name + " (" + weather["city"].country + ")";
      var temperature    = toCelsius(weather["list"][whichDay].temp["day"]) + "°C";
      var maxMinTemp     = toCelsius(weather["list"][whichDay].temp["max"]) + "/" +
                         toCelsius(weather["list"][whichDay].temp["min"]) + "°C" ;
      var description    = weather["list"][whichDay].weather[0].description;
      var humidity       = weather["list"][whichDay].humidity ;
      var reply = date + ", " + location + ": " + temperature + " (" + maxMinTemp + ")" + ", "+ description + ", h: "+ humidity + "%" ;
      console.log(reply);
      callback(reply) ;
    });
  }
}

function toCelsius(kelvin) {
  return Math.floor(kelvin - 273.15);
}

function getDayAndDate(dt) {
  var d = new Date();
  d.setTime(dt);
  var date = d.getDate() +"/"+ (d.getMonth()+1) +"/"+ d.getFullYear() ;
  var day;
  switch (d.getDay()) {
      case 0:
          day = "Sunday";
          break;
      case 1:
          day = "Monday";
          break;
      case 2:
          day = "Tuesday";
          break;
      case 3:
          day = "Wednesday";
          break;
      case 4:
          day = "Thursday";
          break;
      case 5:
          day = "Friday";
          break;
      case  6:
          day = "Saturday";
          break;
  }
  return day + " " + date ;
}

exports.displayWeatherInfo = displayWeatherInfo;
