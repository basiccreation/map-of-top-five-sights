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


//makes locations accessible with two properties
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

    //defines info window
    var largeInfoWindow = new google.maps.InfoWindow();

    //defines bounds
    var bounds = new google.maps.LatLngBounds();

    //loops through initialLocations and adding to locationList
    initialLocations.forEach(function(
        locationItem) {
        self.locationList.push(new Location(
            locationItem));
    });//end initialLocations foreach

    //loops through locationlist and sets marker
    self.locationList().forEach(function(location) {

        // defines  marker
        var marker = new google.maps.Marker({
            map: map,
            position: location.location,
            title: location.title,
            animation: google.maps.Animation.DROP
        });//end marker

        location.marker = marker;

        //opens infowindow when clicks marker
        location.marker.addListener('click', function() {
                populateInfoWindow(this,largeInfoWindow);
            });
        //passes the latlong to the map
        bounds.extend(location.marker.position);

    });//end locationList foreach

    //limits map to marker positions
    map.fitBounds(bounds);


//filter locations || knockmeout.net/2011/04/utility-functions-in-knockoutjs
    this.filteredLocations = ko.computed(function() {

        var filter = self.filter();
        //if there's nothing in filter return list
        if (!self.filter()) {
            self.locationList().forEach(function(location) {
                location.marker.setMap(map);
            });
            return self.locationList();
        }
        //else return items that start with text in filter input
        else {
            return ko.utils.arrayFilter(self.locationList(), function(loc) {
                if (loc.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
                    loc.marker.setMap(map);
                }
                else {
                    loc.marker.setMap(null);
                }
                return loc.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
            });
        }
    }, self);


    //sets first item to currentLocation
    this.currentLocation = ko.observable(this.locationList()[0]);

    //set clicked location to current location
    this.setLocation = function(clickedLocation) {
        populateInfoWindow(clickedLocation.marker, largeInfoWindow);
        self.currentLocation(clickedLocation);
    };


}//end viewmodel

//-------------   Info Window   ----------------
//populates infowindow || GoogleMap API
function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div><h3>' + marker.title + '</h3></div>');
    }

    infowindow.open(map, marker);

    infowindow.addListener('closeclick', function() {
            infowindow.close();
            marker.setAnimation(null);
    });
}//end populateInfoWindow



//-------------   Map   ----------------

var map;

var initialPosition = initialLocations[0].location;

//initializes map || GoogleMap API
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: initialPosition,
            zoom: 19
        })
//resizes map || GoogleMap API
    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });

    ko.applyBindings(new ViewModel());
}//end initMap

//-------------   Hamburger / Search Menu   ----------------

//Collapsible menu || Udacity: Responsive Web Design

var main = document.querySelector('.main');
var listpanel = document.querySelector('#list-panel');

//when the menu icon is clicked, the filter menu slides in
//and the map/menu shift to the right
this.openMenu = function() {
    listpanel.classList.toggle('open');
  //  main.classList.toggle('moveRight');
};
