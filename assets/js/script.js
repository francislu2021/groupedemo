//power button find me 
var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}


//google map display


let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
  var input = document.getElementById('searchInput');
    map.controls[google.maps.ControlPositon.Top_LEFT].push(input);

    var autocomplete = new google.maps.places.autocomplete(input);
    autocomplete.bindTo('bounds', map)

    var infowindow = new google.maps.infowindow();
    var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
});

autocomplete.addListener('place_changed', function(){
    infowindow.close();
    marker.setVisible(false)
    var place = autocomplete.getPlace();
    if (!place.gepmetry) {
        window.alert("autocomplete's returned place contains no geometry, oops!");
        return;
    }
    //if the place has a geometry, then present it on a map.
if (place.geometry.viewpoint) {
  map.fitBounds(place.geometry.viewpoint);
}else{
  map.setCenter(place.geometry.location);
  map.setZoom(17);
}
marker.setIcon(({
URL:place.icon,
size: new google.maps.Size(71,71),
origin: new google.maps.Point(0,0),
anchor: new google.maps.Point(17,34),
scaledSize: new google.maps.Size(35, 35)
}));
marker.setPosition(place.geometry.location);
marker.setVisible(true);

var address = '';
if (place.address_components) {
    address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
        
    ].join(' ');
}

infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
infowindow.open(map, marker);

//location details
for (var i=0; i<place.address_components.length; i++) {
    if(place.address_components[i].types[0] == 'postal_code'){
        document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;
    }
    if(place.address_components[i].types[0] == 'country') {
        document.getElementById('country').innerHTML = place.address_components[i].long_name;
    }
}
document.getElementById('location').innerHTML = place.formatted_address;
document.getElementById('lat').innerHTML = place.geometry.location.lat();
document.getElementById('lon').innerHTML = place.geometry.location.lon();
});
}