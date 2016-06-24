var map;
var geocoder;
var previousMarker;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'));
  var bounds =  new google.maps.LatLngBounds();
	for (var i = 0; i < markers.length; i++) {
		var newMarker = new google.maps.Marker({
			position: {lat: parseFloat(markers[i].lat), lng: parseFloat(markers[i].lng)},
			map: map,
			title: markers[i].title
		});
		newMarker.content = "<p><a href='" + markers[i].web + "' target='_blank'>" + markers[i].title + "</a> <br/> " + markers[i].address + "</p>";
		var infoWindow = new google.maps.InfoWindow();
		google.maps.event.addListener(newMarker, 'click', function () {
			infoWindow.setContent(this.content);
			infoWindow.open(this.getMap(), this);
		});
    bounds.extend(new google.maps.LatLng(parseFloat(markers[i].lat), parseFloat(markers[i].lng)));
	}
  map.fitBounds(bounds);
  map.panToBounds(bounds);
	$('form').submit(function(e) {
	    e.preventDefault();
	    $('#results').html(" ");
	    if (previousMarker != null) {
	    	previousMarker.setMap(null);
	    }
	    createMarker();
	});
}
function createMarker() {
	geocoder = new google.maps.Geocoder();
	var userAddress = $('#user').val();
	geocoder.geocode( { 'address': userAddress}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
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
      	// find the closest markers
      	findClosest(userPoint, radius);
        // delete all markers that are not within range
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
}