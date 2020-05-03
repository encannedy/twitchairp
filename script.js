
$(document).ready(function () {
    var city = [ "New York", "San Francisco", "Portland", "Boston", "Atlanta"];

    var lat;
    var lon;
    var APIkey = "d20ec89cc9724774592de5023f22ec39";

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


for (i=0;i<city.length;i++){
    $("#citySearch").append("<button class='citySearchButton' value='"+city[i]+"'>"+city[i]+"</button>")
}
if(localStorage.getItem("cities"))
{
city.push(JSON.parse(localStorage.getItem("cities")))
}

$("#searchBtn").on("click",function(){
    var input=$("#searchBar").val()
    city.push(input);
    $("#citySearch").append("<button class='citySearchButton' value='"+input+"'>"+input+"</button>")
    forecasts(input);
    localStorage.setItem("cities",JSON.stringify(city))
})

$(document).on("click",".citySearchButton",function(){
    var input=this.innerHTML
    forecasts(input)
})

$(".jumbotron").css("background-image","url(./assets/city-scape.jpg)")

    //function to update time

    //function to get location

    //function to show lat and long

    function forecasts(city) {
       // var city = $(this).attr("data-city");


  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIkey;
        
        //var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city[0] + "&units=imperial&appid=" + APIkey;

        



    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //print city name at the top 
        var ajaxCity = response.city.name;
        $("#cityName").text(ajaxCity);
        var windspeed = response.list[0].wind.speed;
        var lat = response.city.coord.lat
        var long= response.city.coord.lon
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&exclude=hourly&appid='+APIkey,
            method: "GET"
        }).then(function (response){
            console.log(response)
            //put code here to write a for loop with new HTML for each daily item

        })
        $(".w").text(windspeed);//change .w to a specific dom element
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
       // printUV();

    })//put your .then here;
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
    
   // addCity();
}

//
//addCity();
$(document).on("click", ".city", forecasts);
$("#clearBtn").on("click", clear);
});

    