//Neighborhood Map
"use strict";


//Array of initial 5 locations that are set by default
var initialLocations = [{

    title: 'Stændertorvet', //initial location
    location: {
        lat: 55.64140864743973,
        lng: 12.081061005592346
    }
}, {title: 'Roskilde Cathedral',
    location: {
        lat: 55.3834,
        lng: 12.448
    }
}, {
    title: 'Roskilde Festival',
    location: {
        lat: 55.3718,
        lng: 12.436
    }
}, {
    title: 'Viking Ship Museum',
    location: {
        lat: 55.3905,
        lng: 12.4442
    }
}, {
    title: 'Risø',
    location: {
        lat: 55.693,
        lng: 12.100
    }
}, {
    title: 'Land of Legends -- Lejre',
    location: {
        lat: 55.3657,
        lng: 11.5638
    }
}];


//making location accessible with two properties
var Location = function(data) {
    this.title = data.title;
    this.location = data.location;
};

//-----------------------------

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
}//end initMap

