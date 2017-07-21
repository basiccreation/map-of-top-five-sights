//Neighborhood Map

"use strict";
// Info about Julian Morgan
// var info = {
//     intro: ["In 1904, Julia Morgan became the first woman licensed to practice architecture in California. A successful and prolific architect during the first half of the twentieth century, Morgan was born in San Francisco in 1872 and educated at the University of California at Berkeley and L’École des Beaux-Arts in Paris.",
//         "Her trailblazing career helped open the field of architecture to women in the United States. Today she is perhaps best known for the design and construction of publisher W.R. Hearst’s legendary California coastal estate. Yet she was much more than the architect of San Simeon.",
//         "She built a remarkably diverse practice, designing at least 700 buildings that are prized by owners and are now being rediscovered by architectural historians."
//     ],
//     name: 'Julia Morgan',
//     title: 'Architect and Trail Blazer',
//     imgSrc: 'img/xxx.jpg'
// };

// Info about Buildings drawn fully or partially by Julia Morgan
var buildings = [
{
    name: "Hearst Castle",
    address: "Hearst Castle Road, San Simeon, CA",
    imgSrc: "http://via.placeholder.com/350x150",
    wikiLink: "http://www.example.com",
    description: ["Description of", "Hearst Castle"],
    website: "hearstcastle.org",
    location: { lat: 35.6852, lng: -121.1682 }
}, {
    name: "Fairmont Hotel, San Francisco",
    address: "900 North Point St D100, San Francisco, CA 94109",
    imgSrc: "http://via.placeholder.com/350x150",
    wikiLink: "http://www.example.com",
    description: ["Description of", "Fairmont Hotel"],
    website: "fairmont.com",
    location: { lat: 37.802465, lng: -122.44591 }
}, {
    name: "El Campanil",
    address: "602 W 2nd St, Antioch, CA 94509",
    imgSrc: "http://via.placeholder.com/350x150",
    wikiLink: "http://www.example.com",
    description: ["Description of", "El Campanil, the bell tower"],
    website: "mills.edu",
    location: { lat: 38.0170, lng: -121.8141 }
}, {
    name: "Chapel of the Chimes",
    address: "4499 Piedmont Ave, Oakland, CA 94611",
    imgSrc: "http://via.placeholder.com/350x150",
    wikiLink: "http://www.example.com",
    description: ["Description of", "Chapel of the Chimes"],
    website: "oakland.chapelofthechimes.com",
    location: { lat: 37.8391, lng: -122.2456 }
}, {
    name: "Girton Hall",
    address: "Berkeley, CA 94720",
    imgSrc: "http://via.placeholder.com/350x150",
    wikiLink: "http://www.example.com",
    description: ["Description of", "Girton Hall"],
    website: "",
    location: { lat: 37.8724, lng: -122.2542 }
}];

// var Building = function(data) {
//     this.name = ko.observable(data.name);
//     this.address = ko.observable(data.address);
//     this.imgSrc = ko.observable(data.imgSrc);
//     this.wikiLink = ko.observable(data.wikiLink);
//     this.description = ko.observableArray(data.description);
//     this.website = ko.observable(data.website);
// };


// var viewModel = function() {
//     var self = this;




var viewModel = {
//     //JULIA MORGAN
//     self.intro = ko.observable(info.intro);

//     self.name = ko.observable(info.name);

//     self.title = ko.observable(info.title);

//     self.nameandtitle = ko.computed(function() {
//         return self.name() + ", " + self.title();
//     }, self);


  buildings: ko.observableArray([]),
  filter: ko.observable(""),
  search: ko.observable(""),

};



// BUILDINGS
function Building(name, address, website) {
  this.name = ko.observable(name);
  this.address = ko.observable(address);
  this.website = ko.observable(website);
};


//Filter the buildings using the filter text
viewModel.filteredItems = ko.dependentObservable(function() {
    //helper function to filter
 var stringStartsWith = function (string, startsWith) {
        string = string || "";
        if (startsWith.length > string.length)
            return false;
        return string.substring(0, startsWith.length) === startsWith;
    };
  var filter = this.filter().toLowerCase();
  if (!filter) {
    return this.buildings();
  } else {
    return ko.utils.arrayFilter(this.buildings(), function(item) {
      return ko.utils.stringStartsWith(item.name().toLowerCase(), filter);
    });
  }
}, viewModel);

//a JSON string that we got from the server that wasn't automatically converted to an object
var listOfBuildings = '[{"name":"Peach House","address":"34 Fruits Lane","website":"233.com"},{"name":"Plum Castle","address":"45 Fruits Lane","website":"75.com"},{"name":"Donut cottage","address":" 234 Bread Alley","website":"15.us"},{"name":"Milky Way","address":"90 Dairy Drive","website":"450.com"}]';


//parse into an object fruit
var buildingsJSONtoObject = ko.utils.parseJson(listOfBuildings);


//do some basic mapping (without mapping plugin)
var mappedData = ko.utils.arrayMap(buildingsJSONtoObject, function(item) {
  return new Building(item.name, item.address, item.website);
});
//for fruit
viewModel.buildings(mappedData);

ko.applyBindings(viewModel);

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
