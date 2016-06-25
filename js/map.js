var map;
var geocoder;
var previousMarker;
var oldMarkers = [];
function initMap() {
	map = new google.maps.Map(document.getElementById('map'));
  createMultipleMarkers(markers);
	$('form').submit(function(e) {
	    e.preventDefault();
	    $('#results').html(" ");
	    if (previousMarker != null) {
	    	previousMarker.setMap(null);
	    }
	    createUserMarker();
	});
}
function createMultipleMarkers(markers, userPosition) {
  var bounds =  new google.maps.LatLngBounds();
  for (var i = 0; i < markers.length; i++) {
    var newMarker = new google.maps.Marker({
      position: {lat: parseFloat(markers[i].lat), lng: parseFloat(markers[i].lng)},
      map: map,
      title: markers[i].title
    });
    oldMarkers[i] = newMarker;
    newMarker.content = "<p><a href='" + markers[i].web + "' target='_blank'>" + markers[i].title + "</a> <br/> " + markers[i].address + "</p>";
    var infoWindow = new google.maps.InfoWindow();
    google.maps.event.addListener(newMarker, 'click', function () {
      infoWindow.setContent(this.content);
      infoWindow.open(this.getMap(), this);
    });
    bounds.extend(new google.maps.LatLng(parseFloat(markers[i].lat), parseFloat(markers[i].lng)));
  }
  if (userPosition!= null) {
    bounds.extend(new google.maps.LatLng(userPosition));
  }
  map.fitBounds(bounds);
  map.panToBounds(bounds);
}
function createUserMarker() {
	geocoder = new google.maps.Geocoder();
	var userAddress = $('#user').val();
	geocoder.geocode( { 'address': userAddress}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            icon: 'img/green-dot.png',
            title: 'User'
        });
        previousMarker = marker;
        var userLat = parseFloat(results[0].geometry.location.lat());
      	var userLng = parseFloat(results[0].geometry.location.lng());
      	var userPoint = {
        	lat: userLat,
        	lng: userLng
      	}
      	var radius = parseFloat($('#radius').val());
      	// find and list the markers all within specified radius
      	var closest = findClosest(userPoint, radius);
        // clear the map of all the old markers
        for (var i = 0; i < oldMarkers.length; i++) {
          oldMarkers[i].setMap(null);
        }
        // repopulate map with results
        createMultipleMarkers(closest, userPoint);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
}