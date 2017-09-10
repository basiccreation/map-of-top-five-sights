//Neighborhood Map
"use strict";


//Array of initial 5 locations that are set by default
var initialLocations = [{

    title: 'Roskilde Cathedral',
    location: {
        lat: 55.6426,
        lng: 12.0804
    }
}, {
    title: 'Roskilde Festival',
    location: {
        lat: 55.619664188,
        lng: 12.072666376
    }
}, {
    title: 'Viking Ship Museum',
    location: {
        lat: 55.6508,
        lng: 12.0805
    }
}, {
    title: 'Risø',
    location: {
        lat: 55.6945,
        lng: 12.1021
    }
}, {
    title: 'Land of Legends -- Lejre',
    location: {
        lat: 55.6160,
        lng: 11.9425
    }
}];


//making locations accessible with two properties
var Location = function(data) {
    this.title = data.title;
    this.location = data.location;
};


//-------------   ViewModel   ----------------

var ViewModel = function() {

    var self = this;

    //location array
    this.locationList = ko.observableArray(
        []);

    //filtered list
    this.filter = ko.observable();

    //define info window
    var largeInfoWindow = new google.maps.InfoWindow();

    //define bounds
    var bounds = new google.maps.LatLngBounds();

    //loop through initialLocations and adding to locationList
    initialLocations.forEach(function(
        locationItem) {
        self.locationList.push(new Location(
            locationItem));
    });//end initialLocations foreach

    //loop through locationlist and set marker
    self.locationList().forEach(function(location) {

        // define the marker
        var marker = new google.maps.Marker({
            map: map,
            position: location.location,
            title: location.title,
            animation: google.maps.Animation.DROP
        });//end marker

        location.marker = marker;

        bounds.extend(location.marker.position);


    });//end locationList foreach

    //limit map are to marker positions
    map.fitBounds(bounds);


}//end viewmodel



//-------------   Map   ----------------

var map;

var initialPosition = initialLocations[0].location;

//initializes map || GoogleMap API
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: initialPosition,
            zoom: 13
        })
//resizes map || GoogleMap API
    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });

    ko.applyBindings(new ViewModel());
}//end initMap

