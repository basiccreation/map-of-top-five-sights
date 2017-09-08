//Neighborhood Map
"use strict";
//Initial cafe locations
var initialLocations = [{
        name: "Elmwood Cafe",
        address: "2900 College Ave, Berkeley, CA 94705, United States",
        location: {
            lat: 37.8583609,
            lng: -122.25334800000002
        },
        openHour: 8,
        closeHour: 15
    },
    {
        name: "Mudrakers Cafe",
        address: "2801 Telegraph Ave, Berkeley, CA 94705, United States",
        location: {
            lat: 37.859435,
            lng: -122.25884
        },
        openHour: 8,
        closeHour: 22

    },
    {
        name: "Espresso Roma",
        address: "2960 College Ave, Berkeley, CA 94705, United States",
        location: {
            lat: 37.85687009999999,
            lng: -122.2532529
        },
        openHour: 8,
        closeHour: 16
    },
    {
        name: "Sack's Coffee House",
        address: "2701 College Ave, Berkeley, CA 94705, United States",
        location: {
            lat: 37.8620307,
            lng: -122.25336170000003
        },
        openHour: 8,
        closeHour: 22
    },
    {
        name: "Beanery",
        address: "2925 College Ave, Berkeley, CA 94705, United States",
        location: {
            lat: 37.8578626,
            lng: -122.25295340000002
        },
        openHour: 7,
        closeHour: 14
    },
    {
        name: "Peet's Coffee",
        address: "2916 Domingo Ave, Berkeley, CA 94705, United States",
        location: {
            lat: 37.8587078,
            lng: -122.24410990000001
        },
        openHour: 8,
        closeHour: 22
    },
    {
        name: "Rick & Ann's Restaurant",
        address: "2922 Domingo Ave, Berkeley, CA 94705, United States",
        location: {
            lat: 37.8585856,
            lng: -122.24417829999999
        },
        openHour: 7,
        closeHour: 20
    }
];


//Cafe Prototype
var Cafe = function(data) {
    this.name = data.name;
    this.address = data.address;
    this.location = data.location;
    this.openhour = data.openHour;
    this.closehour = data.closehour;
};

//Map and center of map
var map;
var intialPosition = {lat: 37.857, lng: -122.2527};

//Map is visible on page with one marker at initial position
function initMap() {
    // Ashby and College 37.857, -122.2527
    map = new google.maps.Map(document.getElementById('map'), {
        center: intialPosition,
        zoom: 15
    });

    var marker = new google.maps.Marker({
        map: map,
        position: intialPosition,
        animation: google.maps.Animation.DROP
    });

};
//InfoWindow
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });





//    infowindow = new google.maps.InfoWindow();

//     var cafeViewModel = function() {
//     var self = this;

//     this.cafeList = ko.observableArray(cafeMarkers);
//     this.name = ko.observable(cafeList.name)
//     this.filteredCafeList = ko.observable;

// }

//ko.applyBindings(new CafeViewModel());
//google.maps.event.addDomListener(window, 'load', initMap);