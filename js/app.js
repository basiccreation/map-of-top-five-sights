//Neighborhood Map
"use strict";

//MAP

// Create variable to hold map
//var map;

// Create a new blank array for all the listing markers.
//var markers = [];

//Create new map
    function initMap() {
        var initialPosition = {lat: 37.7413549, lng: -122.25};
        var map = new google.maps.Map(document.getElementById('map'), {
            center: initialPosition,
            zoom: 9
        });
        }

      // function initMap() {
      //   var uluru = {lat: -25.363, lng: 131.044};
      //   var map = new google.maps.Map(document.getElementById('map'), {
      //     zoom: 4,
      //     center: uluru
      //   });
      //   var marker = new google.maps.Marker({
      //     position: uluru,
      //     map: map
      //   });
      // }
// $.get(
//    url,
//    function(response) {
//      $("#details").html(JSON.stringify(response.query.pages, null, 4));
//      var result = response.query.pages;
//     // $("#list").html(JSON.stringify(response.query.pages['435997'].revisions[0]['*'], null, 4));
//    },
//    "jsonp"
//  );