//map display
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