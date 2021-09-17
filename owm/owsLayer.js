(function () {

    var url1 = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}';
    var attr1 = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    var urlOwm1 = 'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=2abe21ecc1e023a3e634fc34f9cc1ff0';

    var pntLanding = [59.832743, 31.479341];
    var initMap = function () {
        var OSM_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

        map = L.map("map");
        L.tileLayer(OSM_URL, {
            maxZoom: 18,
            attribution: "Погода",
            id: "map",
        }).addTo(map);
    };

    

    $(function() {
        initMap();
        map.setView(pntLanding, 7);
        L.tileLayer(urlOwm1, { foo: 'bar', attribution: attr1 }).addTo(map);
    })

})();