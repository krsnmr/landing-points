(function () {
  var current_position, current_accuracy;

  function onLocationFound(e) {
    // if position defined, then remove the existing position marker and accuracy circle from the map
    if (current_position) {
      map.removeLayer(current_position);
      map.removeLayer(current_accuracy);
    }

    var radius = Math.round(e.accuracy / 2);

    current_position = L.marker(e.latlng)
      .addTo(map)
      .bindPopup("Вы находитесь внутри " + radius + " метров от этой точки")
      .openPopup();

    current_accuracy = L.circle(e.latlng, radius).addTo(map);
  }

  function onLocationError(e) {
    alert(e.message);
  }

  var pos = [59.851606, 30.196719];
  var map = L.map("map").setView(pos, 14); //
  map.on("locationfound", onLocationFound);
  map.on("locationerror", onLocationError);
  map.locate({ setView: true, maxZoom: 16 });

  window.onload = function () {
    initMap();
  };

  var initMap = function () {
    OSM_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    L.tileLayer(OSM_URL, {
      maxZoom: 18,
      attribution: "",
      id: "mapbox.streets",
    }).addTo(map);
  };
})();
