var Twitter = require("twitter");
var getJSON = require("simple-get-json");
var client = require("./client");
var getCityAndDate = require("./getCityAndDate");
var loadWeatherInfo = require("./loadWeatherInfo");

client.stream('statuses/filter', {track:'@weather_sarea'}, function(stream) {
  stream.on('data', reply );
  stream.on('error', function(error) {
    console.error(error);
    throw error;
  });
});

function reply(tweet) {
  console.log(tweet.text);
  getCityAndDate.cityAndDate(tweet.text , function(cityAndDate){
    loadWeatherInfo.displayWeatherInfo(cityAndDate[0] , cityAndDate[1] , function(weather) {
      console.log("city "+ cityAndDate[0] + "number of date "+ cityAndDate[1]);
      var reply_text = {
        status: "@"+tweet.user.screen_name + " " + weather,
        in_reply_to_status_id: tweet.id_str
      };
      client.post('statuses/update', reply_text , function(error, tweet, response){
        if(error) {
          console.error(error);
          throw error;
        }
      });
    });
  });
}
