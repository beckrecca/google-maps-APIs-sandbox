var map;
function initMap() {
  	map = new google.maps.Map(document.getElementById('map'), {
    	center: {lat: 42.3600825, lng: -71.05888010000001},
    zoom: 12
  	});
	for (var i = 0; i < markers.length; i++) {
		var newMarker = new google.maps.Marker({
			position: {lat: parseFloat(markers[i].lat), lng: parseFloat(markers[i].lng)},
			map: map,
			title: markers[i].title
		});
		newMarker.content = "<p><a href='" + markers[i].web + "'>" + markers[i].title + "</a> <br/> " + markers[i].address + "</p>";
		var infoWindow = new google.maps.InfoWindow();
		google.maps.event.addListener(newMarker, 'click', function () {
			infoWindow.setContent(this.content);
			infoWindow.open(this.getMap(), this);
		});
	}
}