//Neighborhood Map
"use strict";

// google key AIzaSyDVXItUkHHslRJty9xzj4bxMtjTHzGQyc0

//Create new map

var coffeeShop = function(data, self) {
    this.name = ko.observable(data)
}

var map = null;
var cafeMarkers = [];
var service = null;
var infowindow = new google.maps.InfoWindow({size: new google.maps.Size(150,50)});

      function initMap() {
        var intialPosition = new google.maps.LatLng(37.8716, -122.2727);

        map = new google.maps.Map(document.getElementById('map'), {
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: intialPosition,
          zoom: 17
        });

        service = new google.maps.places.PlacesService(map);

        var request = {
          location: intialPosition,
          radius: 500,
          types: ['cafe'],
          name: 'cafe',
          opennow: true
        };
        infowindow = new google.maps.InfoWindow();
        service.nearbySearch(request, callback);
      }

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
                new google.maps.Size(25, 25));
     } else var image = null;

        var marker = new google.maps.Marker({
          map: map,
          icon: image,
          position: place.geometry.location
        });
    var request =  {
          reference: place.reference
    };

    google.maps.event.addListener(marker,'click',function(){
        service.getDetails(request, function(place, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            var contentStr = '<h5>'+place.name+'</h5><p>'+place.formatted_address;
            if (!!place.formatted_phone_number) contentStr += '<br>'+place.formatted_phone_number;
            if (!!place.website) contentStr += '<br><a target="_blank" href="'+place.website+'">'+place.website+'</a>';
            contentStr += '<br>'+place.types+'</p>';
            infowindow.setContent(contentStr);
            infowindow.open(map,marker);
          } else {
            var contentStr = "<h5>No Result, status="+status+"</h5>";
            infowindow.setContent(contentStr);
            infowindow.open(map,marker);
          }
        });

    });
    cafeMarkers.push(marker);
     var side_bar_html = "<a href='javascript:google.maps.event.trigger(cafeMarkers["+parseInt(cafeMarkers.length-1)+"],\"click\");'>"+place.name+"</a><br>";
     document.getElementById('side_bar').innerHTML += side_bar_html;
}

      google.maps.event.addDomListener(window, 'load', initMap);
