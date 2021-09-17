(function($, ko) {

    // получить прогноз погоды для города
    var owmUrl = "https://api.openweathermap.org/data/2.5/weather?id=866055&lang=ru&units=metric&appid=2abe21ecc1e023a3e634fc34f9cc1ff0";
    var owmFcst1Url = "https://api.openweathermap.org/data/2.5/forecast/hourly?id=866055&lang=ru&units=metric&appid=2abe21ecc1e023a3e634fc34f9cc1ff0";
    //Прогноз погоды на 5 дней
    var owmFcst0Url = "https://api.openweathermap.org/data/2.5/forecast?id=866055&lang=ru&units=metric&appid=2abe21ecc1e023a3e634fc34f9cc1ff0";

    // *****  Minute forecast for 1 hour  *****  Hourly forecast for 48 hours  **** 
    var owmFcst1Url = "https://api.openweathermap.org/data/2.5/onecall?lat=59.835057&lon=31.479017&exclude=current,minutely,daily,alerts&appid=2abe21ecc1e023a3e634fc34f9cc1ff0&lang=ru";

    // добавить слой на карту Leaflet
    var url2222222 = "https://tile.openweathermap.org/map/clouds/10/59.835057/31.479017.png?appid=2abe21ecc1e023a3e634fc34f9cc1ff0";
    var url1111111 = "https://openweathermap.org/weathermap?basemap=map&cities=false&layer=clouds&lat=30&lon=-20&zoom=3";
    var mapFcstUrl = "https://maps.openweathermap.org/maps/2.0/weather/1h/PARAIN/10/59.835057/31.479017?date=1527811200&appid=2abe21ecc1e023a3e634fc34f9cc1ff0";
    moment.locale('ru');
    var today = moment(new Date().getTime()).format("DD.MM HH");

    function LocationViewModel(dt_txt, dt, temp, speed, deg, gust, desc, icon, clouds) {
        var self = this;
        self.dt_txt = moment.unix(dt).format('HH').toString() + 'ч'; // 'ddd DD MMM HH'
        self.dt_txt_day = moment.unix(dt).format('ddd').toString();
        self.dt = dt;

        self.temp = Math.round(temp);
        self.speed = Math.round(speed);
        self.deg = deg;
        self.gust = Math.round(gust);
        self.desc = desc;
        self.icon = icon;
        self.clouds = clouds;

        self.iconUrl =
            "https://openweathermap.org/img/w/" + icon + ".png";

          //self.diffDays = moment.duration(today.diff(dt)).asDays();
    }

    function ForecastViewModel() {
        var self = this;

        self.fctDate = moment().format('ddd DD MMM HH:mm').toString(); // ''
        self.items = ko.observableArray();
        self.city = ko.observable();
        self.addItem = function(item) {
            self.items.push(item);
        };
    }

    var vm = new ForecastViewModel();
    


    $(function() {


        
        $("#loadingProc").show();
        $.get(owmFcst0Url, function(data) {
            //console.log(data);

            vm.city(data.city.name);
            for (let i = 0; i < data.list.length; i++) {
                const el = data.list[i];
                var item = new LocationViewModel(
                    el.dt_txt,
                    el.dt,
                    el.main.temp,
                    el.wind.speed,
                    el.wind.deg,
                    el.wind.gust,
                    el.weather[0].description,
                    el.weather[0].icon,
                    el.clouds.all
                );
                vm.addItem(item);
            }
        }).always(function() {
            $("#loadingProc").hide();
        });;

        ko.applyBindings(vm);
    })



})(jQuery, ko)