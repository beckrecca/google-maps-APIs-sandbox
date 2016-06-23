var map;
var geocoder;
function initMap() {
  	map = new google.maps.Map(document.getElementById('map'), {
    	center: {lat: 42.3600825, lng: -71.05888010000001},
    zoom: 11
  	});
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
	}
	$('form').submit(function(e) {
	    e.preventDefault();
	    createMarker();
	});
}
function createMarker() {
	console.log($('#user').val());
	geocoder = new google.maps.Geocoder();
	var userAddress = $('#user').val();
	geocoder.geocode( { 'address': userAddress}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        map.setZoom(12);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            icon: 'img/green-dot.png',
            title: 'User'
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
}