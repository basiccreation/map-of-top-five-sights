//Neighborhood Map
"use strict";

//MAP

// Create variable to hold map
var map;

// Create a new blank array for all the listing markers.
var markers = [];

//Create new map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7413549, lng: -123.9980244 },
        zoom: 8
    })
    };
// $.get(
//    url,
//    function(response) {
//      $("#details").html(JSON.stringify(response.query.pages, null, 4));
//      var result = response.query.pages;
//     // $("#list").html(JSON.stringify(response.query.pages['435997'].revisions[0]['*'], null, 4));
//    },
//    "jsonp"
//  );