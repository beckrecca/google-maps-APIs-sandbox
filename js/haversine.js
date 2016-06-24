// thanks to:
// http://www.movable-type.co.uk/scripts/latlong.html

// convert numeric degress to radians
toRad = function(value) {
  return value * Math.PI / 180;
}

Haversine = function(point1, point2) {
  var R = 3959; // earth radius in mi
  var dLat = toRad(point2.lat - point1.lat);
  var dLng = toRad(point2.lng - point1.lng);
  var lat1 = toRad(point1.lat);
  var lat2 = toRad(point2.lat);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) *
    Math.cos(lat1) * Math.cos(lat2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2);
};

function findDistances(userPoint) {
  var distances = [];
  // loop through places finding the GPS points for each
  for (i = 0; i < markers.length; i++) {
    var pointLat = parseFloat(markers[i].lat);
    var pointLng = parseFloat(markers[i].lng);
    var markerPoint = {
      lat: pointLat,
      lng: pointLng
    }
    // calculate the distance between user and each point
    distances[i] = Haversine(userPoint, markerPoint);
  }
  return distances;
}

function findClosest(userPoint, radius) {
  var distances = findDistances(userPoint);
  var deletes = [];
  $('#results').append("<ul id='listResults'>");
  // find all places within range
  var j = 0;
  for (i = 0; i < distances.length; i++) {
    if (distances[i] <= radius) {
      $('#results').append("<li>" + markers[i].title + "</li>");
    }
    else {
      deletes[j] = i;
      j++;
    }
  }
  $('#results').append("</ul>");
  return deletes;
}