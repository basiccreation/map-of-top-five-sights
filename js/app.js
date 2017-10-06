//Neighborhood Map
(function () {
   "use strict";
   // this function is strict...
}());

var ko,
    google;

//Array of initial 5 locations that are set by default
var initialLocations = [{

    title: "Roskilde Cathedral",
    website: "http://www.roskildedomkirke.dk/",
    location: {
        lat: 55.6426,
        lng: 12.0804
    }
}, {
    title: "Roskilde Festival",
    website: "http://www.roskilde-festival.dk/",
    location: {
        lat: 55.619664188,
        lng: 12.072666376
    }
}, {
    title: "Viking Ship Museum (Roskilde)",
    website: "http://www.vikingeskibsmuseet.dk/en/",
    location: {
        lat: 55.6508,
        lng: 12.0805
    }
}, {
    title: "Risø DTU National Laboratory for Sustainable Energy",
    website: "http://www.dtu.dk/english/about/campuses/dtu-risoe-campus/brief-history-of-risoe",
    location: {
        lat: 55.6945,
        lng: 12.1021
    }
}, {
    title: "Land of Legends (Sagnlandet Lejre)",
    website: "http://www.sagnlandet.dk/en/",
    location: {
        lat: 55.6160,
        lng: 11.9425
    }
}];


//makes locations accessible with three properties
var Location = function (data) {
    this.title = data.title;
    this.location = data.location;
    this.website = data.website;
};


//-------------   ViewModel   ----------------

var ViewModel = function () {

    var self = this;

    //location array
    this.locationList = ko.observableArray(
        []
    );

    //filtered list
    this.filter = ko.observable();

    //defines info window
    var largeInfoWindow = new google.maps.InfoWindow();

    //defines bounds
    var bounds = new google.maps.LatLngBounds();

    //loops through initialLocations and adding to locationList
    initialLocations.forEach(function (
        locationItem
    ) {
        self.locationList.push(new Location(
            locationItem
        ));
    }); //end initialLocations foreach

    //loops through locationlist and sets marker
    self.locationList().forEach(function (location) {

        // defines  marker
        var marker = new google.maps.Marker({
            map: map,
            position: location.location,
            website: location.website,
            title: location.title,
            animation: google.maps.Animation.DROP,
        }); //end marker

        location.marker = marker;

        //opens infowindow when marker's clicked and bounces marker
        location.marker.addListener("click", function () {
            populateInfoWindow(this, largeInfoWindow);
            toggleBounce(this);
        });
        //passes the latlong to the map
        bounds.extend(location.marker.position);

    }); //end locationList foreach

    //limits map to marker positions
    map.fitBounds(bounds);

    //filter locations || knockmeout.net/2011/04/utility-functions-in-knockoutjs
    this.filteredLocations = ko.computed(function () {

        var filter = self.filter();
        //if there's nothing in filter return list
        if (!self.filter()) {
            self.locationList().forEach(function (location) {
                location.marker.setMap(map);
            });
            return self.locationList();
        //else return items that start with text in filter input

        } else {
            return ko.utils.arrayFilter(self.locationList(), function (loc) {
                if (loc.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
                    loc.marker.setMap(map);
                } else {
                    loc.marker.setMap(null);
                }
                return loc.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
            });
        }
    }, self);

    //bounce when location is clicked
    function toggleBounce(marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            for (var i = 0; i < self.locationList()
                .length; i++) {
                var mark = self.locationList()[i].marker;
                if (mark.getAnimation() !== null) {
                    mark.setAnimation(null);
                }
            }
            marker.setAnimation(google.maps.Animation
                .BOUNCE);
        }
    }


    //sets first item to currentLocation
    this.currentLocation = ko.observable(this.locationList()[0]);

    //set clicked location to current location
    this.setLocation = function (clickedLocation) {
        toggleBounce(clickedLocation.marker)
        populateInfoWindow(clickedLocation.marker, largeInfoWindow);
        self.currentLocation(clickedLocation);
        clickedLocation.marker.setAnimation(google.maps.Animation.BOUNCE);
    };

}; //end viewmodel

//-------------   Info Window   ----------------
//populates infowindow || GoogleMap API
function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker !== marker) {
        infowindow.marker = marker;

        //Wikipedia API - MovePlanner Project
        var searchterm = marker.title;
        //      var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='
        //                  + searchterm.replace(" ", "%20")
        //                  + '&format=json&callback=wikiCallback';

        var wikiUrl = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&callback=wikiCallback&srsearch=" +
                searchterm.replace(" ", "%20");

//ERROR: wikipedia not loading || Udacity: Error Handling with JSON P video
        var wikiRequestTimeout = setTimeout(function () {
            infowindow.setContent(
                "<h5>... waiting for a response from Wikipedia.<br>Currently no details for " + marker.title + "</h5>"
            );
        }, 5000);

        $.ajax({
            url: wikiUrl,
            dataType: "jsonp",
            success: function (response) {
                var result = response.query.search;

                var url = "https://en.wikipedia.org/wiki/" + searchterm.replace(" ", "_");

                infowindow.setContent(
                    "<h2>" + result[0].title + "</h2>" +
                    "<p>The <a href = '" + url + "'>Wikipedia article</a> about " + result[0].title + " contains " + result[0].wordcount + " words.</p>" +
                    "<p>Website for <a href = '" + marker.website + "'>" + result[0].title + "</a></p>"
                );

                clearTimeout(wikiRequestTimeout);

            }  // end success method
        }); // end ajax request

        infowindow.open(map, marker);

        infowindow.addListener("closeclick", function () {
            infowindow.close();
            marker.setAnimation(null);
        }); // end infowindow.addlistener
    }
} //end populateInfoWindow







//-------------   Map   ----------------

//ERROR: google map not loading || https://stackoverflow.com/questions/14687237/google-maps-api-async-loading
setTimeout(function () {
    if (!window.google || !window.google.maps) {
    $(".main").html("<style>button {display:none;}</style>");
    $("#errormessage").html("<p class = 'errormessage'>Failed to load Google Maps, looking for clues. Please try again later.</p> <img class = 'errormessage' alt = 'detective looking for clues' src = 'img/detective.jpg'>");
    }
}, 5000);

var map;

var initialPosition = initialLocations[0].location;

//initializes map || GoogleMap API
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: initialPosition,
        zoom: 19
    });
    //resizes map || GoogleMap API
    google.maps.event.addDomListener(window, "resize", function () {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });


    ko.applyBindings(new ViewModel());
} //end initMap

//-------------   Hamburger / Search Menu   ----------------

//Collapsible menu || Udacity: Responsive Web Design

var main = document.querySelector(".main");
var listpanel = document.querySelector("#list-panel");

//when filter icon is clicked, menu slides out and in
var that = this;
that.openMenu = function () {
    listpanel.classList.toggle("open");
};


