$(document).ready(function() {

    $(window).scroll(function() {
        if( $(this).scrollTop() > 0 ) {
            $("header").addClass("header2");
            $("#header-background").addClass("background");
            $("#header-icon").addClass("headericon");
            $("#header__text").addClass("titulo");
        } else {
            $("header").removeClass("header2");
            $("#header-background").removeClass("background");
            $("#header-icon").removeClass("headericon");
            $("#header__text").removeClass("titulo");
        }
    })
});

