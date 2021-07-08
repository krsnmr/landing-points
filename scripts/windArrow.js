(function () {
  var pntLanding = [59.832743, 31.479341];
  var map = L.map("map").setView(pntLanding, 14);
  var angle = 180;
  
  window.onload = function () {
    console.log("wind arrow");
    initSlider();
    initMap();
    initIcon();
  };

  var initIcon = function () {
    L.circle(pntLanding, {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 5,
    }).addTo(map);

    var myIcon = L.icon({
      iconUrl: "red-arrow.png",
      iconSize: [25, 41],// размер
      iconAnchor: [12, 20], // положение точки: вверх и полразмера влево

    });

    var windMarker = L.marker(pntLanding, { icon: myIcon, iconAngle: angle }).addTo(map);

    var b1 = document.getElementById('b1');
    b1.onclick = function(){
      //console.log(123);
      windMarker.setIconAngle(angle);
    }
  };

  var initSlider = function () {
    var slider = document.getElementById("teAngleValue");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
      output.innerHTML = this.value;
      var val = parseInt(this.value);
      angle = val;
      if ((val >= 0 && val < 45) || (val >= 315 && val <= 360))
        output.innerHTML += "&deg; - Северный";
      else if (val >= 45 && val < 135) output.innerHTML += "&deg; - Восточный";
      else if (val >= 135 && val < 225) output.innerHTML += "&deg; - Южный";
      else if (val >= 225 && val < 315) output.innerHTML += "&deg; - Западный";
    };
  };

  var initMap = function () {
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
  };
})();
