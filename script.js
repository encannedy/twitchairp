
$(document).ready(function () {
    var city = [ "New York", "San Francisco", "Portland", "Boston", "Atlanta"];
    var lat;
    var lon;
    var APIkey = "20ec89cc9724774592de5023f22ec39";

    //set up for date
    var now = moment().format('LL');
    console.log(now);
    $("#currentDay").text(now);

    var alltemp = $();
    var allhumidity = $();
    var alldates =$();
    var allimg =$();
    var temps = [];
    var hums = [];
    var dates = [];
    var icons = [];
    var imgAlts = [];
;



    //function to update time

    //function to get location

    //function to show lat and long

    function forecasts() {
        var city = $(this).attr("data-city");
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIkey;

        



    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //print city name at the top 
        var city = response.city.name;
        $("#cityName").text(city);
        var windspeed = response.list[0].wind.speed;
        $(".w").text(windspeed);
        //print temperature, humidity, and the icon using .find method. 
        //.find the class in <span> to create a new object collection, 
        //then loop through the object and response to print temperature, humidity, and icon \
        console.log(response);
        for (var i = 0; i < response.list.length; i += 8) {
         
        }
        //for loop for cards at botton; temp, humidity, date etc.
        for (var i = 0; i < 6; i++) {
            
        }
        //make another ajax call for UV index 
        lat = response.city.coord.lat;
        lon = response.city.coord.lon;
        printUV();

    });
};

function printUV() {
    var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIkey + "&lat=" + lat + "&lon=" + lon;

    console.log(lat);
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response) {
        $(".uv").text(response.value);
        console.log(response);
    })

}

function clear() {
    $("#cities").empty();
    cities = ["New York", "San Francisco", "Portland", "Boston", "Atlanta"];
    
    addCity();
}


addCity();
$(document).on("click", ".city", forecasts);
$("#clearBtn").on("click", clear);
});

    