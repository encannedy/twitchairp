
$(document).ready(function () {
    var city = [ "New York", "San Francisco", "Portland", "Boston", "Atlanta"];
    if(localStorage.getItem("cities"))
    {
    city=(JSON.parse(localStorage.getItem("cities")))
    }
    //fuction for local storage above
    var lat;
    var lon;
    var APIkey = "d20ec89cc9724774592de5023f22ec39";

    //set up for date and time
    var now = moment().format('L');
    console.log(now);
    $("#currentDay").text(now);

;


for (i=0;i<city.length;i++){
    $("#buttonDiv").append("<button class='citySearchButton' value='"+city[i]+"'>"+city[i]+"</button>");
}


$("#searchBtn").on("click",function(){
    var input=$("#searchBar").val();
    city.push(input);
    $("#buttonDiv").append("<button class='citySearchButton' value='"+input+"'>"+input+"</button>");
    forecasts(input);
    localStorage.setItem("cities",JSON.stringify(city));
    if(input === ""){
        return;
    }
})

$(document).on("click",".citySearchButton",function(){
    var input=this.innerHTML;
    forecasts(input);
})

    function forecasts(city) {
       


  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
      console.log(response);
        //print city name at the top 
        var ajaxCity = response.city.name;
        $("#currentDay").text(ajaxCity+ " "+ now);
        var windspeed = "Wind Speed: " + response.list[0].wind.speed + "mph";
        var lat = response.city.coord.lat;
        var long= response.city.coord.lon;
        var temp= "Temperature: " + response.list[0].main.temp + String.fromCharCode(176) + "F";
        console.log(temp)
        var humid= "Humidity: " + response.list[0].main.humidity + "%";


      var tempEl=  $("<p>").text(temp);
      var humidityEl= $("<p>").text(humid);
      var windEl=$("<p>").text(windspeed);
        

      $("#weatherDetails").empty().append(tempEl, humidityEl, windEl);
      



        $.ajax({
            url:"http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + APIkey+ "&lat=" +lat+"&lon=" +long,
            method: "GET"
        }).then(function (response){
            console.log(response);
            var UVindex="UV index:" + response[0].value;
            var UVEl=$("<p>").text(UVindex);
            $("#weatherDetails").append(UVEl);

            if( UVindex <8){
                UVEl.addClass("low");
                UVEl.removeClass("high");
            }else{
                UVEl.addClass("high");
                UVEl.removeClass("low");
            }
        })
      
        //for loop for cards at botton; temp, humidity, date etc.
        console.log("fivedays", response); 
        $("#forecast").empty();
        for (var i = 1; i < 6; i++) {
            var forecastDate= moment().add (i, 'days').format("L");
            var forcastCol= $("<div class='col'>");

            $("#forecast").append(forcastCol);

            var forecastWeatherData= "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png";
            var forcastTempData= response.list[i].main.temp;
            var forcastHumidityData= response.list[i].main.humidity;

            var forcastDateP =$("<p>").text(forecastDate);
            var forecastWeatherIcon = $("<img>").attr("src", forecastWeatherData);
            var forcastTempEl = $("<p>").text("Tempature: " + forcastTempData + String.fromCharCode(176) +"F");
            var forcastHumidityEl = $("<p>").text("Humidity: " + forcastHumidityData + "%");

           forcastCol.append(forcastDateP, forecastWeatherIcon, forcastTempEl, forcastHumidityEl);
           $("#forecast").append(forcastCol);
            

        }


    })


function clear() {
    $("#cities").empty();
    cities = ["New York", "San Francisco", "Portland", "Boston", "Atlanta"];
    localStorageStorage.clear();

    
   
}

$(document).on("click", ".city", forecasts);
$("#clearBtn").on("click", clear);
};

});

//make sure to add a clear button and everything is appending to itself