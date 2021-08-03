(function($, ko) {

    // получить прогноз погоды для города
    var owmUrl = "https://api.openweathermap.org/data/2.5/weather?id=866055&lang=ru&units=metric&appid=2abe21ecc1e023a3e634fc34f9cc1ff0";
    var owmFcst1Url = "https://api.openweathermap.org/data/2.5/forecast/hourly?id=866055&lang=ru&units=metric&appid=2abe21ecc1e023a3e634fc34f9cc1ff0";
    var owmFcst0Url = "https://api.openweathermap.org/data/2.5/forecast?id=866055&lang=ru&units=metric&appid=2abe21ecc1e023a3e634fc34f9cc1ff0";

    moment.locale('ru');
    var today = moment(new Date().getTime()).format("DD.MM HH");

    function LocationViewModel(dt_txt, dt, temp, speed, deg, gust, desc, icon, clouds) {
        var self = this;
        self.dt_txt = moment(dt * 1000).format('ddd DD MMM HH').toString() + 'ч';;
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

          self.diffDays = moment.duration(today.diff(dt)).asDays();
    }

    function ForecastViewModel() {
        var self = this;

        self.items = ko.observableArray();
        self.city = ko.observable();
        self.addItem = function(item) {
            self.items.push(item);
        };
    }

    var vm = new ForecastViewModel();
    


    $(function() {


        
        $("#loadingProc").show();
        $.get(owmFcst0Url, function (data) {
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
        }).always(function () {
          $("#loadingProc").hide();
        });

        ko.applyBindings(vm);
    })



})(jQuery, ko)