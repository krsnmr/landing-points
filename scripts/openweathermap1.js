var owm1 = (function($, ko, L) {
    // London
    var href0 =
        "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2abe21ecc1e023a3e634fc34f9cc1ff0";

    // Приладожский
    var href1 =
        "https://api.openweathermap.org/data/2.5/weather?id=866055&lang=ru&units=metric&appid=2abe21ecc1e023a3e634fc34f9cc1ff0";

    // By count
    var href2 =
        "https://api.openweathermap.org/data/2.5/find?lat=59.835057&lon=31.479017&cnt=8&lang=ru&units=metric&APPID=2abe21ecc1e023a3e634fc34f9cc1ff0";

    var href3 =
        "https://api.openweathermap.org/data/2.5/forecast?id=866055&lang=ru&units=metric&appid=2abe21ecc1e023a3e634fc34f9cc1ff0";

    var pntCone = [59.835057, 31.479017];

    function LocationViewModel(name, lat, lon, temp, speed, deg, desc, icon, clouds) {
        var self = this;
        self.name = name;
        self.lat = lat;
        self.lon = lon;
        self.temp = Math.round(temp);
        self.speed = speed;
        self.deg = deg;

        self.desc = desc;
        self.icon = icon;
        self.clouds = clouds;
        self.iconUrl =
            "https://openweathermap.org/img/w/" + icon + ".png";


    }

    function CitiesViewModel() {
        var self = this;

        self.locs = ko.observableArray();

        self.addLoc = function(loc) {
            self.locs.push(loc);
        };
    }



    var map;
    var minLat = 0,
        minLon = 0,
        maxLat = 0,
        maxLon = 0;

    var initMap = function() {
        var OSM_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

        map = L.map("map2");
        L.tileLayer(OSM_URL, {
            maxZoom: 18,
            attribution: "Погода поблизости",
            id: "map2",
        }).addTo(map);
    };

    $(function() {
        var vm = new CitiesViewModel();
        initMap();

        $.get(href2, function(data) {
            //console.log(data);

            for (let i = 0; i < data.list.length; i++) {
                const el = data.list[i];
                var loc = new LocationViewModel(
                    el.name,
                    el.coord.lat,
                    el.coord.lon,
                    el.main.temp,
                    el.wind.speed,
                    el.wind.deg,
                    el.weather[0].description,
                    el.weather[0].icon,
                    el.clouds.all
                );
                vm.addLoc(loc);

                var p = [el.coord.lat, el.coord.lon];
                var mrk = L.marker(p).addTo(map);

                setMinMaxVal(el.coord.lat, el.coord.lon);
                mrk.bindTooltip(el.name).openTooltip();
            }

            var corner1 = L.latLng(minLat, minLon),
                corner2 = L.latLng(maxLat, maxLon),
                bounds = L.latLngBounds(corner1, corner2);

            map.fitBounds(bounds);
        });

        ko.applyBindings(vm);
    });


    var setMinMaxVal = function(lat, lon) {
        if (minLat == 0) {
            minLat = lat;
            maxLat = lat;
            minLon = lon;
            maxLon = lon;
        }
        if (lat > maxLat) maxLat = lat;
        if (lon > maxLon) maxLon = lon;
        if (lat < minLat) minLat = lat;
        if (lon < minLon) minLon = lon;
    };


})(jQuery, ko, L);

/*
$.get(href1, function(data) {
            //console.log('напр ветра - ', data.wind.deg);
            console.log("weather - ", data);
            //&units=metric&lang=ru
            $('#demo1').text(data.wind.deg);
            $('#demo2').text(data.wind.speed);
            $('#demo3').text(data.wind.gust);
            $('#demo4').text(data.weather[0].description);
            $('#demo5').text(data.main.temp);
            var iconurl = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

            $('#wicon').attr('src', iconurl);
        });

*/