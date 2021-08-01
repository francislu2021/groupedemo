function init() {
  new google.maps.Map(document.getElementById('map'), {
    center: { lat: 59.325, lng: 18.069 },
    zoom: 15
  });
}

const marker = new google.maps.Marker({ map, position: initialPosition });

  // Get user's location
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => console.log(`Lat: ${position.coords.latitude} Lng: ${position.coords.longitude}`),
      err => alert(`Error (${err.code}): ${err.message}`)
    );
  } else {
    alert('Geolocation is not supported by your browser.');
  }
