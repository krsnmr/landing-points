(function () {
  var pntLanding = [59.832743, 31.479341];
  var pntArrow = [59.834362, 31.479521];
  var pntCone = [59.835057, 31.479017];

  var angleInWind = 180; // южный

  var radiusInMeter1 = 100; // 100м
  var radiusInMeter2 = 200; // 200м
  var radiusInMeter3 = 300; // 300м
  var radiusInMeter4_1 = 500; // 500м
  var radiusInMeter4_2 = 700; // 650м
  var radiusInMeter4_3 = 900; // 500м
  var radiusInMeter4_4 = 1100; // 650м

  var iconRedArrow = L.icon({
    iconUrl: "scripts/images/red-arrow-111.png",
    iconSize: [16, 48],
    iconAnchor: [8, 24],
    popupAnchor: [-3, -76],
  });

  var iconWindCone = L.icon({
    iconUrl: "scripts/images/wind-cone-111.png",
    iconSize: [16, 48],
    iconAnchor: [8, 24],
    popupAnchor: [-3, -76],
  });

  var drawNorthArrow = function () {
    //////////////////////////////////
    /****  Направление на север  ****/
    //////////////////////////////////
    var north = L.control({
      position: "bottomright",
    });
    north.onAdd = function (map) {
      var div = L.DomUtil.create("div", "info");
      div.innerHTML =
        '<img class="north" src="scripts/images/north-arrow-111.png">';
      return div;
    };
    north.addTo(map);
    ///////////////////////
  };

  var map = L.map("map").setView(pntLanding, 14);
  ACCESS_TOKEN =
    "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";
  OSM_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  var url =
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ";
  L.tileLayer(OSM_URL, {
    maxZoom: 18,
    attribution: "",
    id: "mapbox.streets",
  }).addTo(map);

  var calcPointsDests = function () {
    var angle = window.document.getElementById("teAngleValue").value;
   
    if (!angle) {
      angle = angleInWind;
    }
    ////////////////////////////////////////////////////////////////////
    ///// 0 - северный, 90 - восточный, 180 - южный, 270 - западный ////
    ////////////////////////////////////////////////////////////////////
    // точка 1: 100 метров против ветра до цели
    var angleInDegrees1 = parseInt(angle) - 180;
    var angleInDegrees2_1 = parseInt(angle) - 90; // справа от цели
    var angleInDegrees2_2 = parseInt(angle) + 90; // слева от цели
    //console.log( "angleInDegrees2_2");
    //console.log(  angleInDegrees2_2);
    //console.log(  angleInDegrees1);

    var angleInDegrees3 = parseInt(angle) - 0; // спереди от цели

    var markerA = L.marker(pntLanding); //.addTo(map);

    var ll1 = markerA.getLatLng();

    var markerB = L.GeometryUtil.destination(
      ll1,
      angleInDegrees1,
      radiusInMeter1
    );

    var markerC_1 = L.GeometryUtil.destination(
      ll1,
      angleInDegrees2_1,
      radiusInMeter2
    );
    var markerC_2 = L.GeometryUtil.destination(
      ll1,
      angleInDegrees2_2,
      radiusInMeter2
    );

    var markerD = L.GeometryUtil.destination(
      ll1,
      angleInDegrees3,
      radiusInMeter3
    );
    var markerE = L.GeometryUtil.destination(
      ll1,
      angleInDegrees3,
      radiusInMeter4_1
    );
    var markerF = L.GeometryUtil.destination(
      ll1,
      angleInDegrees3,
      radiusInMeter4_2
    );
    var markerG = L.GeometryUtil.destination(
      ll1,
      angleInDegrees3,
      radiusInMeter4_3
    );

    // стрелка с ветром
    var windMarker = L.marker(pntArrow, {
      iconAngle: angle,
      icon: iconRedArrow,
    }); //.addTo(map);

    var windConeMarker = L.marker(pntCone, {
      iconAngle: angleInDegrees1,
      icon: iconWindCone,
    });

    //var northImage = L.

    layerGroup1.clearLayers();

    // create markers
    //markerA.addTo(layerGroup1);
    L.circle(markerB).addTo(layerGroup1);
    L.circle(markerC_1).addTo(layerGroup1);
    L.circle(markerC_2).addTo(layerGroup1);
    L.circle(markerD).addTo(layerGroup1);
    L.circle(markerE).addTo(layerGroup1);
    L.circle(markerF).addTo(layerGroup1);
    L.circle(markerG).addTo(layerGroup1);

    windMarker.addTo(layerGroup1);
    windConeMarker.addTo(layerGroup1);

    // remove all the markers in one go
  };

  var layerGroup1 = null;
  window.onload = function () {
    initSlider();

    drawNorthArrow();

    var btn1 = window.document.getElementById("b1");
    btn1.onclick = function () {
      calcPointsDests();
    };

    /* красный круг для точки приземления*/
    L.circle(pntLanding, {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 10,
    }).addTo(map);

    // добавить слой в котором отображать точки
    layerGroup1 = L.layerGroup().addTo(map);

    calcPointsDests();
  };

  var initSlider = function () {
    var slider = document.getElementById("teAngleValue");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
      output.innerHTML = this.value;
      var val = parseInt(this.value);
      if ((val >= 0 && val < 45) || (val >= 315 && val <= 360))
        output.innerHTML += " - Северный";
      else if (val >= 45 && val < 135) output.innerHTML += " - Восточный";
      else if (val >= 135 && val < 225) output.innerHTML += " - Южный";
      else if (val >= 225 && val < 315) output.innerHTML += " - Западный";
    };
  };
})();
