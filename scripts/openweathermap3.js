(function($, ko) {

    // получить текущую погоду из сервиса
    var owmUrl = "https://api.openweathermap.org/data/2.5/weather?id=866055&lang=ru&units=metric&appid=2abe21ecc1e023a3e634fc34f9cc1ff0";
    var owmFcst1Url = "https://api.openweathermap.org/data/2.5/forecast/hourly?id=866055&lang=ru&units=metric&appid=2abe21ecc1e023a3e634fc34f9cc1ff0";
    //var owmFcst0Url = "https://api.openweathermap.org/data/2.5/forecast?id=866055&lang=ru&units=metric&appid=2abe21ecc1e023a3e634fc34f9cc1ff0";

    // *****  Minute forecast for 1 hour  *****  Hourly forecast for 48 hours  **** 
    var owmFcst1Url = "https://api.openweathermap.org/data/2.5/onecall?lat=59.835057&lon=31.479017&exclude=current,minutely,daily,alerts&units=metric&appid=2abe21ecc1e023a3e634fc34f9cc1ff0&lang=ru";


    moment.locale('ru');


    function LocationViewModel(dt, temp, speed, deg, gust, desc, icon, clouds) {
        var self = this;
        self.dt_txt = moment.unix(dt).format('HH').toString() + 'ч'; // 'ddd DD MMM HH'
        self.dt_txt_day = moment.unix(dt).format('ddd').toString();
        self.dt = dt;
        self.temp = Math.round(temp);
        self.speed = speed;
        self.deg = deg;
        self.gust = gust;
        self.desc = desc;
        self.icon = icon;
        self.clouds = clouds;

        self.iconUrl =
            "https://openweathermap.org/img/w/" + icon + ".png";
    }

    function ForecastViewModel() {
        var self = this;

        self.fctDate = moment().format('ddd DD MMM HH:mm').toString(); // ''
        self.items = ko.observableArray();
        //self.city = ko.observable();
        self.addItem = function(item) {
            self.items.push(item);
        };
    }

    $(function() {
        var vm = new ForecastViewModel();
        $("#loadingProc").show();
        $.get(owmFcst1Url, function(data) {
            //console.log(data);

            //vm.city(data.city.name);
            for (let i = 0; i < data.hourly.length; i++) {
                const el = data.hourly[i];
                var item = new LocationViewModel(
                    //el.dt_txt,
                    el.dt,
                    el.temp,
                    el.wind_speed,
                    el.wind_deg,
                    el.wind_gust,
                    el.weather[0].description,
                    el.weather[0].icon,
                    el.clouds
                );
                vm.addItem(item);
            }
        }).always(function() {
            $("#loadingProc").hide();
        });;

        ko.applyBindings(vm);
    })



})(jQuery, ko)