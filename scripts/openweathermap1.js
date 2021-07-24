var owm1 = (function($) {

    var href0 = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2abe21ecc1e023a3e634fc34f9cc1ff0";

    var href = "https://api.openweathermap.org/data/2.5/weather?id=866055&lang=ru&units=metric&appid=2abe21ecc1e023a3e634fc34f9cc1ff0";


    $(function() {

        $.get(href, function(data) {
            console.log('напр ветра - ', data.wind.deg);
            //&units=metric&lang=ru
            $('#demo1').text(data.wind.deg);
            $('#demo2').text(data.wind.speed);
            $('#demo3').text(data.wind.gust);
            $('#demo4').text(data.weather[0].description);
            $('#demo5').text(data.main.temp);
            var iconurl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

            $('#wicon').attr('src', iconurl);
        });


        //console.log(11111);

    });

})(jQuery);