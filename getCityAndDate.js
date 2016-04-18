fs = require('fs');

function cityAndDate(text ,arrCityAndDate) {
  var day = whichDay(text);
  fs.readFile('./cities.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    text = text.toLowerCase().split(" ");
    for (var i=0; i<text.length; i++ ){
      if(data.indexOf("," + capitalize(text[i]) + "," ) !== -1){
        console.log(text[i]);
        arrCityAndDate([text[i] ,day])
      }
    }
  });
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function whichDay(text) {
  var textLowerCase = text.toLowerCase();
  if(textLowerCase.indexOf("day after tomorrow") !== -1){
    return 2;
  }else {
    if(textLowerCase.indexOf("tomorrow") !== -1){
      return 1;
    }else {
      return 0;
    }
  }
}


exports.cityAndDate = cityAndDate ;
