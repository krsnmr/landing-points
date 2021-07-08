(function () {
  var current_position, current_accuracy;

  function onLocationFound(e) {
    // if position defined, then remove the existing position marker and accuracy circle from the map
    if (current_position) {
      map.removeLayer(current_position);
      map.removeLayer(current_accuracy);
    }

    var radius = Math.round(e.accuracy / 2);

    document.getElementById('s1').style.color = 'red';
    // сделать через 1 белым
    window.setTimeout(
      function () {
        document.getElementById('s1').style.color = 'white';
      },
      1000);

    current_position = L.marker(e.latlng)
      .addTo(map)
      .bindPopup("Устройство определило что вы находитесь внутри окружности на карте радиусом " + radius + " метров от этой точки")
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

  // !!!!!! запустить переодическое определение координаты !!!!
  map.locate({
    setView: false,
    maxZoom: 16,
    watch: true,
    timeout: 10000, // 10сек в случае ошибки
  });

  // после загрузки инициировать карту
  window.onload = function () {
    initGetPosPeriod();
  };

  var initMap = function () {
    OSM_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    L.tileLayer(OSM_URL, {
      maxZoom: 18,
      attribution: "Положение на карте",
      id: "mapbox.streets",
    }).addTo(map);
  };



  initMap();
  //initGetPosPeriod();
})();