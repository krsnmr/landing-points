var owm1 = (function ($, ko, L) {


    var OSM_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";


    var currentLandingPoint = [59.835057, 31.479017];

    var map;

    var initMap = function () {
        map = L.map('map').setView([30.201479, 120.155908], 13);
        L.tileLayer(OSM_URL, { maxZoom: 18, attribution: "Путилово аэродром", id: "map" }).addTo(map);

    };

    var iconRedArrow = L.icon({
        iconUrl: "scripts/images/red-arrow-111.png",
        iconSize: [16, 48],
        iconAnchor: [8, 24],
        popupAnchor: [-3, -76],
    });


    $(function () {

        initMap();

        //var layerGroup1 = L.layerGroup().addTo(map);

        //var windMarker = L.marker(currentLandingPoint, { icon: iconRedArrow });
        //windMarker.addTo(layerGroup1);

        //map.setView(currentLandingPoint, 16);


        initMarkers();


    });


    // your data
    var list = [
        { "lon": "120.15261", "lat": "30.182835" },
        { "lon": "120.152431666667", "lat": "30.1828733333333" },
        { "lon": "120.15239", "lat": "30.182755" },
        { "lon": "120.152303333333", "lat": "30.1826566666667" }
    ];

    var initMarkers = function () {

        // iterate your data       
        for (var i in list) {
            var img = new Image();
            img.src = './scripts/images/arrow.png';

            var options = {
                label: 'your label',
                labelFlag: false,
                labelColor: 'black',
                img: img
            };

            console.log(list[i].lat + ' - ' + list[i].lon);

            var lat = Number(list[i].lat);// + offSiteY;
            var lon = Number(list[i].lon);// - offSiteX;
            var latlng = { lat: lat, lon: lon };            

            // use angeMaker plugin
            var angleMarker = L.angleMarker(latlng, options);
            var angle = 0;

            if (i > 0) {
                var previousLatLng = { lat: list[i - 1].lat, lon: list[i - 1].lon };
                var nextLanLng = { lat: list[i].lat, lon: list[i].lon };
                // get angele between A(previousPoint) and B(nextPoint)
                angle = angleMarker.getAngle(previousLatLng, nextLanLng);
            }
            // set angele A -> B
            angleMarker.setHeading(angle);
            map.addLayer(angleMarker);
        }


    }




})(jQuery, ko, L);

