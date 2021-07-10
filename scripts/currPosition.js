(function() {
    var current_position; // маркер с определенной координатой
    var current_accuracy; // область с точностью с которой определена координата

    function onLocationFound(e) {
        // удалить старые объекты... if position defined, then remove the existing position marker and accuracy circle from the map
        if (current_position) {
            map.removeLayer(current_position);
            map.removeLayer(current_accuracy);
        }

        var radius = Math.round(e.accuracy / 2);

        //console.log('высота', e.altitude);
        //console.log('скорость', e.speed);
        //console.log('timestamp', e.timestamp);


        document.getElementById('s1').style.color = 'red';
        document.getElementById('s2').innerHTML =
            "высота:" + ((e.altitude) ? e.altitude : '-') +
            //"; скорость:" + e.speed +
            "; направление: " + ((e.heading) ? e.heading : '-') +
            "; точность:" + e.accuracy + "м." +
            "; штамп:" + e.timestamp;
        // сделать через 1 белым
        window.setTimeout(function() {
            document.getElementById('s1').style.color = 'white';
        }, 500);

        current_position = L.marker(e.latlng)
            .addTo(map)
            //.bindPopup("Устройство определило что вы находитесь внутри окружности на карте радиусом " + radius + " метров от этой точки")
            //.openPopup();

        current_accuracy = L.circle(e.latlng, radius).addTo(map);
    }


    function onLocationError(e) {
        alert(e.message);
    }

    var pos = [59.851606, 30.196719];
    var map = L.map("map").setView(pos, 14); //
    map.on("locationfound", onLocationFound);
    map.on("locationerror", onLocationError);


    // после загрузки инициировать карту
    window.onload = function() {

    };

    var initMap = function() {
        OSM_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        L.tileLayer(OSM_URL, {
            maxZoom: 18,
            attribution: "Положение на карте",
            id: "mapbox.streets",
        }).addTo(map);
    };

    // !!!!!! запустить переодическое определение координаты !!!!
    function initLocate(isSetView) {

        map.locate({
            setView: isSetView,
            maxZoom: 16,
            watch: true,
            timeout: 10000, // 10сек в случае ошибки
        });
    }

    function initCheckCurView() {
        var checkbox = document.getElementById('isUp');
        checkbox.addEventListener('change', (event) => {
            if (event.currentTarget.checked) {
                //alert('checked');
                //console.log('initCheckCurView 1');
                initLocate(true);
            } else {
                //alert('not checked');
                //console.log('initCheckCurView 0');
                initLocate(false);
            }
        })
    }

    initLocate(false);
    initMap();
    initCheckCurView();
})();