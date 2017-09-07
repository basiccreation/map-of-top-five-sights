//Neighborhood Map
"use strict";
//Initial cafe locations
  var initialLocations = [
      {
      name: "Elmwood Cafe",
      address: "2900 College Ave, Berkeley, CA 94705, United States",
      location: {
        lat:37.8583609,
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
      address: "2922 Domingo Ave, Berkeley, CA 94705, United States"
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

//Map

var map = null;
var service = null;
var infowindow = new google.maps.InfoWindow({ size: new google.maps.Size(150, 50) });

function initMap() {
    var intialPosition = new google.maps.LatLng(37.857, -122.2527);
// Ashby and College 37.857, -122.2527
    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: intialPosition,
        zoom: 15
    });

    service = new google.maps.places.PlacesService(map);

    var request = {
        location: intialPosition,
        radius: 575,
        types: ['cafe'],
        name: 'coffeeShop',
        opennow: true
    };

    infowindow = new google.maps.InfoWindow();

    service.textSearch(request, callback);
}// end initMap

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    if (place.icon) {
        var image = new google.maps.MarkerImage(
            place.icon, new google.maps.Size(71, 71),
            new google.maps.Point(0, 0), new google.maps.Point(17, 34),
            new google.maps.Size(40, 40));
       } else var image = null;

    var marker = new google.maps.Marker({
        map: map,
        icon: image,
        position: place.geometry.location,
        animation: google.maps.Animation.DROP,
    });

    var request = {
        reference: place.reference
    };

    google.maps.event.addListener(marker, 'click', function() {
        service.getDetails(request, function(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                infowindow.setContent(place.name);
                infowindow.open(map, marker);
            } else {
                infowindow.setContent("No name available, sorry");
                infowindow.open(map, marker);
            }
        });
    });

var cafeMarkers = [];

cafeMarkers.push(marker);


    var cafeViewModel = function() {
    var self = this;

    this.cafeList = ko.observableArray(cafeMarkers);
    this.name = ko.observable(cafeList.name)
    this.filteredCafeList = ko.observable;

}



    var side_bar_html = "<a href='javascript:google.maps.event.trigger(cafeMarkers["
                        + parseInt(cafeMarkers.length - 1) + "],\"click\");'>" +
                        place.name + "   "+ place.formatted_address + "   " + place.geometry.location+"</a><br>";

    document.getElementById('side_bar').innerHTML += side_bar_html;
}//end createMarker
ko.applyBindings(new CafeViewModel());
google.maps.event.addDomListener(window, 'load', initMap);