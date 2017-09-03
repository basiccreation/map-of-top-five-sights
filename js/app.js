//Neighborhood Map
"use strict";

// google key AIzaSyDVXItUkHHslRJty9xzj4bxMtjTHzGQyc0

//Create new map

var coffeeShop = function(data, self) {
    this.name = ko.observable(data)
}

var map;
var markers;
var service;
var infowindow = new google.maps.InfoWindow({size: new google.maps.Size(150,50)});

function initMap() {

    var initialPosition = {lat: 37.8513549, lng: -122.25};

    map = new google.maps.Map(document.getElementById('map'), {
        center: initialPosition,
        zoom: 17
    });

    var service = new google.maps.places.PlacesService(map);

    var marker = new google.maps.Marker({
        position: initialPosition,
        map: map
    });

    infowindow = new google.maps.InfoWindow();



    service.textSearch({
        location: initialPosition,
        radius: 1000,
        type: ['cafe'],
        keyword: 'cafe',
        openNow: true
        }, processResults);

    function callback(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        createMarker(place);
        }
    }
} // end initMap

function processResults(results, status, pagination) {
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    return;
  } else {
    createMarkers(results);

    if (pagination.hasNextPage) {
      var moreButton = document.getElementById('more');

      moreButton.disabled = false;

      moreButton.addEventListener('click', function() {
        moreButton.disabled = true;
        pagination.nextPage();
      });
    }
    //TODO else hide more button
  }
} // end processResults

function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();
  var placesList = document.getElementById('places');

  for (var i = 0, place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      position: place.geometry.location,
      animation: google.maps.Animation.DROP,
    });


    // google.maps.event.addListener(marker, 'click', function() {
    //   infowindow.setContent(place.name);
    //   infowindow.open(map, this);
    //   });

    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
      setMapOnAll(null);
    }

    // Shows any markers currently in the array.
    function showMarkers() {
      setMapOnAll(map);
    }

    placesList.innerHTML += '<li>' + place.name + '</li>';

    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
} // end createMarkers
