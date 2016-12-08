var weather;

function setup() {
  noLoop();

  var url = 'http://api.openweathermap.org/data/2.5/weather?q=London,UK' +
    '&APPID=7bbbb47522848e8b9c26ba35c226c734';
  
  weather = loadJSON(url, drawWeather);
}

function drawWeather() {
  background(200);
  // get the humidity value out of the loaded JSON
  var humidity = weather.main.humidity;
  println(humidity);
  fill(0, humidity); // use the humidity value to set the alpha
  ellipse(width / 2, height / 2, 50, 50);
}