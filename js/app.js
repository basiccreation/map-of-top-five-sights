//Neighborhood Map
"use strict";


//   //$("#articlesHeader").fadeIn();
//   var searchTerm = document.getElementById("zipcode").value;
// // google key AIzaSyDVXItUkHHslRJty9xzj4bxMtjTHzGQyc0
//   var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyB3bLgW65HcS0cTzwUYm6S9DdyhaE0xze0";// + searchTerm;
// $("searchButton").click(function(){
//     $.getJSON(url, function(result){
//         $("#details").html(JSON.stringify(result, null, 4));
//         });
//     });
//-------------------------------------

//Create new map

var map;

function initMap() {
  var initialPosition = {lat: 37.7413549, lng: -122.25};

  map = new google.maps.Map(document.getElementById('map'), {
    center: initialPosition,
    zoom: 17
  });

          var marker = new google.maps.Marker({
          position: initialPosition,
          map: map
        });

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: initialPosition,
    radius: 5000,
    type: ['cafe'],
    keyword: 'cafe',
    openNow: true
  }, processResults);
}

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
}

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
      title: place.name,
      position: place.geometry.location
    });

    placesList.innerHTML += '<li>' + place.name + '</li>';

    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
}
