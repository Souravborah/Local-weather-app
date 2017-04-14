
var API_KEY = "77d781e587f773dc7966a2e11e2b1c90";
var cel = false;
var weatherData;


function displayTemp(fTemp, c){
	if(c) return Math.round((fTemp - 32) * (5/9)) + " C";
	return Math.round(fTemp) + " F";
}


function render(weatherData, cel){
	   var currentLocation = weatherData.name;
       var currentWeather = weatherData.weather[0].description;
       var currentTemp = displayTemp(weatherData.main.temp, cel);
       var high = displayTemp(weatherData.main.temp_max, cel);
       var low = displayTemp(weatherData.main.temp_min, cel);
       var ic = weatherData.weather[0].icon;


       $("#location").html(currentLocation);
       $("#temp").html(currentTemp);
       $("#currentWeather").html(currentWeather);
       $("#highLow").html(high + " / " + low);
       
       var iconSrc = "http://openweathermap.org/img/w/" + ic + ".png";
       $('#currentWeather').prepend('<img src="' + iconSrc + '">');
       	

}

$(function(){

    var loc;

    $.getJSON('http://ipinfo.io', function(d){

      console.log()	

      loc = d.loc.split(",");


     $.getJSON('http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + loc[0] + '&lon=' + loc[1] + '&APPID=' + API_KEY, function(apiData){

     	weatherData = apiData;

     	render(apiData, cel);

     	$('#toggle').click(function(){
     		cel = !cel;
     		render(weatherData, cel);
     	})

       
     })




    })




})