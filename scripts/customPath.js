(function(){

    var pntLanding = [59.832743, 31.479341];

    var latlngs = [[59.833206, 31.477494],[59.832947, 31.480316],
    [59.832149, 31.477666], [59.831949, 31.480627]];

    console.log(123);

    var map = L.map("map").setView(pntLanding, 14);
    var OSM_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    L.tileLayer(OSM_URL, {
        maxZoom: 18,
        attribution: "",
        id: "mapbox.streets",
      }).addTo(map);


      var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

})();
