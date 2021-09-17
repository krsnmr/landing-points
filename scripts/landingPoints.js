(function() {

    var pntLanding = [59.832743, 31.479341];
    var pntArrow = [59.834362, 31.479521];
    var pntCone = [59.835057, 31.479017];
    var pntLanding2 = [59.837940, 31.483487];
    var pntLanding3 = [59.835052, 31.478415];
    var pntLanding4 = [59.838154, 31.476199];
    var pntLanding5 = [59.831464, 31.474351];

    var currentLandingPoint = null;

    var angleInWind = 180; // южный

    var radiusInMeter1_3 = 10; // 5м
    var radiusInMeter1_2 = 50; // 50м
    var radiusInMeter1 = 100; // 100м
    var radiusInMeter2 = 200; // 200м
    var radiusInMeter3 = 300; // 300м
    var radiusInMeter4_1 = 500; // 500м
    var radiusInMeter4_2 = 700; // 700м
    var radiusInMeter4_3 = 900; // 900м
    var radiusInMeter4_4 = 1100; // 1100м

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

    var drawNorthArrow = function() {
        //////////////////////////////////
        /****  Направление на север  ****/
        //////////////////////////////////
        var north = L.control({
            position: "bottomright",
        });
        north.onAdd = function(map) {
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
        attribution: "Контрольные точки",
        id: "mapbox.streets",
    }).addTo(map);

    var getLastPointValue = function() {
        var windSpeed = window.document.getElementById("ddlWindSpeed").value;
        if (windSpeed == 1)
            return radiusInMeter1;
        if (windSpeed == 2)
            return radiusInMeter1_2;
        if (windSpeed == 3)
            return radiusInMeter1_3;
    }

    var calcPointsDests = function() {
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


        var angleInDegrees3 = parseInt(angle) - 0; // спереди от цели

        // стрелка с ветром
        var windMarker = L.marker(pntArrow, { iconAngle: angle, icon: iconRedArrow, });

        // конус
        var windConeMarker = L.marker(pntCone, { iconAngle: angleInDegrees1, icon: iconWindCone, });

        var markerA = L.marker(currentLandingPoint);

        var ll1 = markerA.getLatLng();
        // точка 1 (100)
        var dest1 = getLastPointValue();
        var markerB = L.GeometryUtil.destination(ll1, angleInDegrees1, dest1);

        // точка 2 слева от цели (200)
        var markerC_1 = L.GeometryUtil.destination(ll1, angleInDegrees2_1, radiusInMeter2);
        var markerC_1_2 = L.GeometryUtil.destination(ll1, angleInDegrees2_1, 100);


        // точка 2 слева от цели (200)
        var markerC_2 = L.GeometryUtil.destination(ll1, angleInDegrees2_2, radiusInMeter2);
        var markerC_2_2 = L.GeometryUtil.destination(ll1, angleInDegrees2_2, 100);

        // точка 3 (300) radiusInMeter3
        var markerD_1 = L.GeometryUtil.destination(ll1, angleInDegrees3, 100);
        var markerD_2 = L.GeometryUtil.destination(ll1, angleInDegrees3, 200);
        var markerD = L.GeometryUtil.destination(ll1, angleInDegrees3, radiusInMeter3);

        var markerE_1 = L.GeometryUtil.destination(ll1, angleInDegrees3, 400);
        var markerE_2 = L.GeometryUtil.destination(ll1, angleInDegrees3, radiusInMeter4_1);
        var markerF_0 = L.GeometryUtil.destination(ll1, angleInDegrees3, 600);
        var markerF_1 = L.GeometryUtil.destination(ll1, angleInDegrees3, radiusInMeter4_2);
        var markerG_0 = L.GeometryUtil.destination(ll1, angleInDegrees3, 800);
        var markerG_1 = L.GeometryUtil.destination(ll1, angleInDegrees3, radiusInMeter4_3);
        var markerG_2 = L.GeometryUtil.destination(ll1, angleInDegrees3, 1000);

        layerGroup1.clearLayers();


        L.polyline([markerB, markerG_2], { color: '#ccc', weight: 1 }).addTo(layerGroup1);
        L.polyline([markerC_1, markerC_2], { color: '#ccc', weight: 1 }).addTo(layerGroup1);
        // create markers
        L.circle(ll1, { color: "#f00" }).addTo(layerGroup1);
        L.circle(markerB).addTo(layerGroup1);
        L.circle(markerC_1).addTo(layerGroup1);
        L.circle(markerC_2).addTo(layerGroup1);
        L.circle(markerC_1_2, { color: "#ссс" }).addTo(layerGroup1);
        L.circle(markerC_2_2, { color: "#ссс" }).addTo(layerGroup1);

        L.circle(markerD).addTo(layerGroup1);
        L.circle(markerD_1, { color: "#ссс" }).addTo(layerGroup1);
        L.circle(markerD_2, { color: "#ссс" }).addTo(layerGroup1);

        L.circle(markerE_1, { color: "#ссс" }).addTo(layerGroup1);
        L.circle(markerE_2, { color: "#f0f" }).addTo(layerGroup1);
        L.circle(markerF_0, { color: "#ссс" }).addTo(layerGroup1);
        L.circle(markerF_1, { color: "#f0f" }).addTo(layerGroup1);
        L.circle(markerG_0, { color: "#ссс" }).addTo(layerGroup1);
        L.circle(markerG_1, { color: "#f0f" }).addTo(layerGroup1);
        L.circle(markerG_2, { color: "#ссс" }).addTo(layerGroup1);

        windConeMarker.addTo(layerGroup1);
        windMarker.addTo(layerGroup1);
    };

    // !!!!!! запустить переодическое определение координаты !!!!
    var initLocate = function(isSetView) {

        map.locate({
            setView: isSetView,
            maxZoom: 16,
            watch: true,
            timeout: 10000, // 10сек в случае ошибки
        });
    }

    map.on("locationfound", onLocationFound);
    map.on("locationerror", onLocationError);

    var layerGroup1 = null;
    window.onload = function() {
        initSlider();

        drawNorthArrow();

        addLandingArea();

        addBuildings();

        $('#ddlWindSpeed').on('change', function() { calcPointsDests(); });
        $('#ddlLandingPoints').on('change', function() {
            var pointIdx = $(this).val();
            setLandingPoint(pointIdx);
        });

        // добавить слой в котором отображать точки
        layerGroup1 = L.layerGroup().addTo(map);

        currentLandingPoint = pntLanding;

        calcPointsDests();

        setOpenWeatherData();

        initLocate(false);
    };


    var setLandingPoint = function(idx) {
        console.log('setLandingPoint - ' + idx);
        if (idx == 1)
            currentLandingPoint = pntLanding;
        else if (idx == 2)
            currentLandingPoint = pntLanding2;
        else if (idx == 3)
            currentLandingPoint = pntLanding3;
        else if (idx == 4)
            currentLandingPoint = pntLanding4;
        else if (idx == 5)
            currentLandingPoint = pntLanding5;


        map.setView(currentLandingPoint);

        calcPointsDests();
    }

    var current_position; // маркер с определенной координатой
    var current_accuracy; // область с точностью с которой определена координата
    function onLocationFound(e) {
        // удалить старые объекты... if position defined, then remove the existing position marker and accuracy circle from the map
        if (current_position) {
            map.removeLayer(current_position);
            map.removeLayer(current_accuracy);
        }
        current_position = L.marker(e.latlng).addTo(map)
        var radius = Math.round(e.accuracy / 2);
        current_accuracy = L.circle(e.latlng, radius).addTo(map);
    }

    function onLocationError(e) {
        console.log(e.message);
    }

    // 
    var initSlider = function() {
        var slider = document.getElementById("teAngleValue");
        var output = document.getElementById("demo");
        output.innerHTML = setWindTxt(slider.value); // Display the default slider value

        // Update the current slider value (each time you drag the slider handle)
        slider.oninput = function() {
            output.innerHTML = this.value;
            var val = parseInt(this.value);
            var valTxt = setWindTxt(val);
            output.innerHTML = valTxt;

            calcPointsDests();
        };
    };


    // получить текущую погоду из сервиса
    var owmUrl = "https://api.openweathermap.org/data/2.5/weather?id=866055&lang=ru&units=metric&appid=2abe21ecc1e023a3e634fc34f9cc1ff0";
    // получить текущую погоду из сервиса
    var setOpenWeatherData = function() {
        $('#loadingProc').show();
        $.get(owmUrl, function(data) {
                var windDeg = data.wind.deg;
                var speedDeg = data.wind.speed;
                $('#teAngleValue').val(windDeg);
                calcPointsDests();
                $('#demo').html(setWindTxt(windDeg));
                $("#spWindSpeed").html(speedDeg + 'м/с');
            }).fail(function() {
                alert("error");
            })
            .always(function() {
                $('#loadingProc').hide();
            });;
    }




    // отобразить текстовое описание ветра
    var setWindTxt = function(angle) {
        var val = parseInt(angle);
        var txt;
        if ((val >= 0 && val < 22.5) || (val >= 337.5 && val <= 360))
            txt = " Северный";
        else if (val >= 22.5 && val < 67.5)
            txt = " Северо-Восточный";
        else if (val >= 67.5 && val < 112.5)
            txt = " Восточный";
        else if (val >= 112.5 && val < 157.5)
            txt = " Юго-Восточный";
        else if (val >= 157.5 && val < 202.5)
            txt = " Южный";
        else if (val >= 202.5 && val < 247.5)
            txt = " Юго-Западный";
        else if (val >= 247.5 && val < 292.5)
            txt = " Западный";
        else if (val >= 292.5 && val < 337.5)
            txt = " Северо-Западный";
        return angle + '&#176;' + txt;
    };


    var addLandingArea = function() {
        var latlngs = [
            [59.834859, 31.479439],
            [59.834594, 31.477459],
            [59.834373, 31.477159],
            [59.833828, 31.477309],
            [59.832911, 31.476504],
            [59.830118, 31.479766],
            [59.829897, 31.481053],
            [59.829908, 31.481954],
            [59.830830, 31.481503],
            [59.832841, 31.480527],
            [59.834859, 31.479439]
        ];
        var polygon = L.polygon(latlngs, {
            color: 'yellow'
        }).addTo(map);

        var latlngs2 = [
            [59.834875, 31.479470],
            [59.835473, 31.479210],
            [59.835274, 31.477847],
            [59.834791, 31.477262],
            [59.834594, 31.477273],
            [59.834872, 31.479472],
            [59.834875, 31.479470]
        ];
        L.polygon(latlngs2, {
            color: '#fc0'
        }).addTo(map);
    };

    var addBuildings = function() {

        var latlngs1 = [
            [59.835809, 31.478027],
            [59.835851, 31.478394],
            [59.835946, 31.478334],
            [59.835902, 31.477975],
            [59.835809, 31.478027]
        ];

        var latlngs2 = [
            [59.836067, 31.478489],
            [59.836174, 31.478417],
            [59.836219, 31.478757],
            [59.836112, 31.478819],
            [59.836067, 31.478489]
        ];

        var latlngs3 = [
            [59.836061, 31.478474],
            [59.836020, 31.478160],
            [59.836084, 31.478131],
            [59.836121, 31.478438],
            [59.836061, 31.478474]
        ];

        L.polygon(latlngs1, {
            color: '#777'
        }).addTo(map);

        L.polygon(latlngs2, {
            color: '#777'
        }).addTo(map);

        L.polygon(latlngs3, {
            color: '#777'
        }).addTo(map);
    };

})();