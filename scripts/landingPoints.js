(function () {

    var pntLanding = [59.832743, 31.479341];
    var pntArrow = [59.835225, 31.479419];

    var angleInWind = 180; // южный

    var radiusInMeter1 = 100; // 100м
    var radiusInMeter2 = 200; // 200м
    var radiusInMeter3 = 300; // 300м
    var radiusInMeter4 = 600; // 600м

    var map = L.map('map').setView(pntLanding, 14);
    ACCESS_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
    OSM_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ';
    L.tileLayer(OSM_URL, {
        maxZoom: 18,
        attribution: '',
        id: 'mapbox.streets'
    }).addTo(map);


    var calcPointsDests = function () {

        var angle = window.document.getElementById('teAngleValue').value;

        if (!angle) angle = angleInWind;

        ////////////////////////////////////////////////////////////////////
        ///// 0 - северный, 90 - восточный, 180 - южный, 270 - западный ////
        ////////////////////////////////////////////////////////////////////
        // точка 1: 100 метров против ветра до цели
        var angleInDegrees1 = angle - 180;
        var angleInDegrees2 = angle - 90; // справа от цели
        var angleInDegrees3 = angle - 0; // спереди от цели

        var markerA = L.marker(pntLanding);//.addTo(map);

        var markerB = L.GeometryUtil.destination(markerA.getLatLng(), angleInDegrees1, radiusInMeter1);
        //L.marker(markerB).addTo(map);

        var markerC = L.GeometryUtil.destination(markerA.getLatLng(), angleInDegrees2, radiusInMeter2);
        //L.marker(markerC).addTo(map);

        var markerD = L.GeometryUtil.destination(markerA.getLatLng(), angleInDegrees3, radiusInMeter3);
        //L.marker(markerD).addTo(map);

        var markerE = L.GeometryUtil.destination(markerA.getLatLng(), angleInDegrees3, radiusInMeter4);

        // стрелка с ветром
        var windMarker = L.marker(pntArrow, { iconAngle: angle });//.addTo(map);

        layerGroup1.clearLayers();

        // create markers
        markerA.addTo(layerGroup1);
        L.marker(markerB).addTo(layerGroup1);
        L.marker(markerC).addTo(layerGroup1);
        L.marker(markerD).addTo(layerGroup1);
        L.marker(markerE).addTo(layerGroup1);

        windMarker.addTo(layerGroup1);

        // remove all the markers in one go        
    }

    var layerGroup1 = null;
    window.onload = function () {

        initSlider();

        drawNorthArrow();

        var btn1 = window.document.getElementById('b1');
        btn1.onclick = function () {
            calcPointsDests()
        }

        /* красный круг для точки приземления*/
        L.circle(pntLanding, { color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 5 }).addTo(map);

        // добавить слой в котором отображать точки 
        layerGroup1 = L.layerGroup().addTo(map);

        calcPointsDests();
    }

    var initSlider = function () {
        var slider = document.getElementById("teAngleValue");
        var output = document.getElementById("demo");
        output.innerHTML = slider.value; // Display the default slider value

        // Update the current slider value (each time you drag the slider handle)
        slider.oninput = function () {
            output.innerHTML = this.value;
            var val = parseInt(this.value);
            if (val >= 0 && val < 45 || val >= 315 && val <= 360)
                output.innerHTML += ' - Северный';
            else if (val >= 45 && val < 135)
                output.innerHTML += ' - Восточный';
            else if (val >= 135 && val < 225)
                output.innerHTML += ' - Южный';
            else if (val >= 225 && val < 315)
                output.innerHTML += ' - Западный';
        }
    }


    var drawNorthArrow = function () {


        //////////////////////////////////
        /****  Направление на север  ****/
        //////////////////////////////////
        var north = L.control({ position: "bottomright" });
        north.onAdd = function (map) {
            var div = L.DomUtil.create("div", "info legend");
            div.innerHTML = '<img src="scripts/images/549441-204.png">';
            return div;
        }
        north.addTo(map);
        ///////////////////////
    }



})();