//Neighborhood Map

"use strict";
// Info about Julian Morgan
var info = {
    intro: ["In 1904, Julia Morgan became the first woman licensed to practice architecture in California. A successful and prolific architect during the first half of the twentieth century, Morgan was born in San Francisco in 1872 and educated at the University of California at Berkeley and L’École des Beaux-Arts in Paris.",
        "Her trailblazing career helped open the field of architecture to women in the United States. Today she is perhaps best known for the design and construction of publisher W.R. Hearst’s legendary California coastal estate. Yet she was much more than the architect of San Simeon.",
        "She built a remarkably diverse practice, designing at least 700 buildings that are prized by owners and are now being rediscovered by architectural historians."
    ],
    name: 'Julia Morgan',
    title: 'Architect and Trail Blazer',
    imgSrc: 'img/xxx.jpg'
};

// Info about Buildings drawn fully or partially by Julia Morgan
var initialBuildings = [{
    name: "Hearst Castle",
    address: "Hearst Castle Road, San Simeon, CA",
    imgSrc: "http://via.placeholder.com/350x150",
    wikiLink: "http://www.example.com",
    description: ["Description of", "Hearst Castle"],
    website: "hearstcastle.org",
    location: { lat: 37.8413549, lng: -120.9632393 }
}, {
    name: "Fairmont Hotel, San Francisco",
    address: "900 North Point St D100, San Francisco, CA 94109",
    imgSrc: "http://via.placeholder.com/350x150",
    wikiLink: "http://www.example.com",
    description: ["Description of", "Fairmont Hotel"],
    website: "fairmont.com",
    location: { lat: 37.7444883, lng: -121.2949465 }
}, {
    name: "El Campanil",
    address: "123 Pivot Drive",
    imgSrc: "http://via.placeholder.com/350x150",
    wikiLink: "http://www.example.com",
    description: ["Description of", "El Campanil, the bell tower"],
    website: "mills.edu",
    location: { lat: 37.5347062, lng: -120.4895759 }
}, {
    name: "Chapel of the Chimes",
    address: "4499 Piedmont Ave, Oakland, CA 94611",
    imgSrc: "http://via.placeholder.com/350x150",
    wikiLink: "http://www.example.com",
    description: ["Description of", "Chapel of the Chimes"],
    website: "oakland.chapelofthechimes.com",
    location: { lat: 37.55281777, lng: -121.684377 }
}, {
    name: "Girton Hall",
    address: "Berkeley, CA 94720",
    imgSrc: "http://via.placeholder.com/350x150",
    wikiLink: "http://www.example.com",
    description: ["Description of", "Girton Hall"],
    website: "",
    location: { lat: 37.6180628, lng: -121.61237 }
}];

var Building = function(data) {
    this.name = ko.observable(data.name);
    this.address = ko.observable(data.address);
    this.imgSrc = ko.observable(data.imgSrc);
    this.wikiLink = ko.observable(data.wikiLink);
    this.description = ko.observableArray(data.description);
    this.website = ko.observable(data.website);
    this.marker = ko.observable(null);

};

var viewModel = function() {
    var self = this;

    //Julia Morgan
    self.intro = ko.observable(info.intro);

    self.name = ko.observable(info.name);

    self.title = ko.observable(info.title);

    self.nameandtitle = ko.computed(function() {
        return self.name() + ", " + self.title();
    }, self);

    // Buildings
    //create building array
    self.buildingList = ko.observableArray([]);

    //populate bulidings array
    initialBuildings.forEach(function(buildingItem) {
        self.buildingList.push(new Building(buildingItem));
    });

    //sets current building
    this.currentBuilding = ko.observable(this.buildingList()[0]);

    //sets selection to current
    this.selection = function(selected) {
        self.currentBuilding(selected);
    };
};

ko.applyBindings(new viewModel());
// Create variable to hold map
var map;

// Create a new blank array for all the listing markers.
var markers = [];

//Create new map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7413549, lng: -123.9980244 },
        zoom: 8
    });
    //create info window
    var largeInfowindow = new google.maps.InfoWindow();

    // Create boundaries variable around all markers
    var bounds = new google.maps.LatLngBounds();

    // Create an array of markers on initialize.
    for (var i = 0; i < initialBuildings.length; i++) {
        // Get the position from the location array.
        var position = initialBuildings[i].location;
        var name = initialBuildings[i].name;
        var snippet = initialBuildings[i].address;

        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            name: name,
            snippet: snippet,
            animation: google.maps.Animation.DROP,
            id: i

        });
        var chosen =

            // Push the marker to our array of markers.
            markers.push(marker);

        // // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
            //Change the marker color
        });
        bounds.extend(markers[i].position);
    }
    // Extend the boundaries of the map for each marker
    map.fitBounds(bounds);
}

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {

    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<h2 >' + marker.name + '</h2>');
        marker.setIcon('https://www.google.com/mapfiles/marker_green.png');
        infowindow.open(map, marker);

        // Clears marker property when infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.setMarker = null;
            marker.setIcon('https://www.google.com/mapfiles/marker.png');

        });
    }
}






//var url = "http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=Julia%20Morgan";
// var url = "http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=Julia%20Morgan";
//var url = "http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=Main%20Page";
//
// $.get(
//    url,
//    function(response) {
//      $("#details").html(JSON.stringify(response.query.pages, null, 4));
//      var result = response.query.pages;
//     // $("#list").html(JSON.stringify(response.query.pages['435997'].revisions[0]['*'], null, 4));
//    },
//    "jsonp"
//  );
