var owm1 = (function ($, ko, L) {


    var OSM_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";


    var currentLandingPoint = [59.835057, 31.479017];

    var map;

    var initMap = function () {
        map = L.map("map");
        L.tileLayer(OSM_URL, {   maxZoom: 18, attribution: "Путилово аэродром", id: "map" }).addTo(map);
    };

    var iconRedArrow = L.icon({
        iconUrl: "scripts/images/red-arrow-111.png",
        iconSize: [16, 48],
        iconAnchor: [8, 24],
        popupAnchor: [-3, -76],
    });
    

    $(function () {
       
        initMap();

        var layerGroup1 = L.layerGroup().addTo(map);

        var windMarker = L.marker(currentLandingPoint, { icon: iconRedArrow });
        windMarker.addTo(layerGroup1);

        map.setView(currentLandingPoint, 16);
       
    });


})(jQuery, ko, L);

