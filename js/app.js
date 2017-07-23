//Neighborhood Map

"use strict";

var info = {
    intro: ["In 1904, Julia Morgan became the first woman licensed to practice architecture in California. A successful and prolific architect during the first half of the twentieth century, Morgan was born in San Francisco in 1872 and educated at the University of California at Berkeley and L’École des Beaux-Arts in Paris.",
        "Her trailblazing career helped open the field of architecture to women in the United States. Today she is perhaps best known for the design and construction of publisher W.R. Hearst’s legendary California coastal estate. Yet she was much more than the architect of San Simeon.",
        "She built a remarkably diverse practice, designing at least 700 buildings that are prized by owners and are now being rediscovered by architectural historians."
    ],
    name: 'Julia Morgan',
    title: 'Architect and Trail Blazer',
    imgSrc: 'img/xxx.jpg'
};

var subjectViewModel = function() {
    var self = this;
    //Julia Morgan
    self.intro = ko.observable(info.intro);
    self.name = ko.observable(info.name);
    self.title = ko.observable(info.title);
    self.nameandtitle = ko.computed(function() {
        return self.name() + ", " + self.title();
    }, self);

};
// Buildings

var Building2 = function(data) {
    this.name = ko.observable(data.name);
    this.address = ko.observable(data.address);
    this.imgSrc = ko.observable(data.imgSrc);
    this.wikiLink = ko.observable(data.wikiLink);
    this.description = ko.observableArray(data.description);
    this.website = ko.observable(data.website);
};

function Building(name, address, website, imgSrc, wikiLink, description, location) {
    var that = this;
    that.name = ko.observable(name);
    that.address = ko.observable(address);
    that.website = ko.observable(website);
    that.imgSrc = ko.observable(imgSrc);
    that.wikiLink = ko.observable(wikiLink);
    that.description = ko.observableArray(description);
    that.location = ko.observable(location);
};

var viewModel = {
    buildings: ko.observableArray([]),
    filter: ko.observable(""),
    search: ko.observable(""),
    currentBuilding: ko.observable("")
};

//ko.utils.arrayFilter - filter the buildings using the filter text
viewModel.filteredItems = ko.dependentObservable(function() {

    var filter = this.filter().toLowerCase();

    var stringStartsWith = function(string, startsWith) {
        string = string || "";
        if (startsWith.length > string.length)
            return false;
        return string.substring(0, startsWith.length) === startsWith;
    };

    if (!filter) {
        return this.buildings();
    } else {
        return ko.utils.arrayFilter(this.buildings(), function(item) {
            return ko.utils.stringStartsWith(item.name().toLowerCase(), filter);
        });
    }
}, viewModel);

// //a JSON string of buildings
 var list_Of_Buildings = '[{"name":"Peach House","address":"34 Fruits Lane","website":"233.com","imgSrc":"photo.jpg","wikiLink":"wiki.org","description":["heres a desc"]},{"name":"Plum Castle","address":"45 Fruits Lane","website":"75.com","imgSrc":"photo.jpg","wikiLink":"wiki.org","description":["heres a desc"]},{"name":"Donut cottage","address":" 234 Bread Alley","website":"15.us","imgSrc":"photo.jpg","wikiLink":"wiki.org","description":["heres a desc"]},{"name":"Milky Way","address":"90 Dairy Drive","website":"450.com","imgSrc":"photo.jpg","wikiLink":"wiki.org","description":["heres a desc"]},{"name":"Mars Mansion","address":"890 Fairy Extension","website":"33450.com","imgSrc":"photo.jpg","wikiLink":"wiki.org","description":["heres a desc"]}]';
 var listOfBuildings2 = [{"name":"Peach House","address":"34 Fruits Lane","website":"233.com","imgSrc":"photo.jpg","wikiLink":"wiki.org","description":["heres a desc"]},{"name":"Plum Castle","address":"45 Fruits Lane","website":"75.com","imgSrc":"photo.jpg","wikiLink":"wiki.org","description":["heres a desc"]},{"name":"Donut cottage","address":" 234 Bread Alley","website":"15.us","imgSrc":"photo.jpg","wikiLink":"wiki.org","description":["heres a desc"]},{"name":"Milky Way","address":"90 Dairy Drive","website":"450.com","imgSrc":"photo.jpg","wikiLink":"wiki.org","description":["heres a desc"]},{"name":"Mars Mansion","address":"890 Fairy Extension","website":"33450.com","imgSrc":"photo.jpg","wikiLink":"wiki.org","description":["heres a desc"]}];

//parse into an object
var buildingsJSONtoObject = ko.utils.parseJson(list_Of_Buildings);

//do some basic mapping (without mapping plugin)
var mappedData = ko.utils.arrayMap(buildingsJSONtoObject, function(item) {
    return new Building(item.name, item.address, item.website, item.imgSrc, item.wikiLink, item.description, item.location);
});

var buildingViewModel = function() {
    var self = this;

    // BUILDINGS
    //create building array
    self.buildingList = ko.observableArray([]);

    //populate buildings array
    listOfBuildings2.forEach(function(buildingItem) {
        self.buildingList.push(new Building2(buildingItem));
    });

    //sets current building
    this.currentBuilding = ko.observable(this.buildingList()[0]);

    //sets selection to current
    this.selection = function(selected) {
        self.currentBuilding(selected);
    };
}; // end buildingViewModel

viewModel.buildings(mappedData);

//ko.applyBindings(new subjectViewModel, document.getElementById('introduction'));
//ko.applyBindings(viewModel, document.getElementById('listOfBuildings'));
ko.applyBindings(new buildingViewModel, document.getElementById('buildingsection'));

//MAP

// // Create variable to hold map
// var map;

// // Create a new blank array for all the listing markers.
// var markers = [];

// //Create new map
// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: 40.7413549, lng: -123.9980244 },
//         zoom: 8
//     });
//     //create info window
//     var largeInfowindow = new google.maps.InfoWindow();

//     // Create boundaries variable around all markers
//     var bounds = new google.maps.LatLngBounds();

//     // Create an array of markers on initialize.
//     for (var i = 0; i < initialBuildings.length; i++) {
//         // Get the position from the location array.
//         var position = initialBuildings[i].location;
//         var name = initialBuildings[i].name;
//         var snippet = initialBuildings[i].address;

//         // Create a marker per location, and put into markers array.
//         var marker = new google.maps.Marker({
//             map: map,
//             position: position,
//             name: name,
//             snippet: snippet,
//             animation: google.maps.Animation.DROP,
//             id: i

//         });

//             // Push the marker to our array of markers.
//             markers.push(marker);

//         // // Create an onclick event to open an infowindow at each marker.
//         marker.addListener('mouseover', function() {
//             populateInfoWindow(this, largeInfowindow);
//             //Change the marker color
//         });
//         bounds.extend(markers[i].position);
//     }
//     // Extend the boundaries of the map for each marker
//     map.fitBounds(bounds);
// }

// // This function populates the infowindow when the marker is clicked. We'll only allow
// // one infowindow which will open at the marker that is clicked, and populate based
// // on that markers position.
// function populateInfoWindow(marker, infowindow) {

//     // Check to make sure the infowindow is not already opened on this marker.
//     if (infowindow.marker != marker) {
//         infowindow.marker = marker;
//         infowindow.setContent('<h2 >' + marker.name + '</h2>');
//         infowindow.open(map, marker);

//         // Clears marker property when infowindow is closed.
//         infowindow.addListener('mouseout', function() {
//             infowindow.setMarker = null;
//             marker.setIcon('https://www.google.com/mapfiles/marker.png');
//         });
//     }
// }

//var url = "http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=Julia%20Morgan";
//var url = "http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=Julia%20Morgan";
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