$(document).ready(function() {
    console.log(window.location.pathname);
    console.log(window.location.pathname == "/");
    if(window.location.pathname == "/"){
        $("#homeLink").toggleClass("active");
    }
    else {
        $("#aboutLink").toggleClass("active");
    }
    //Dont do animation on about page if phone view
    if ($(window).width() < 768){
        $("#aboutTitleText").toggleClass("animated");        
        $("#aboutText").toggleClass("animated");
        $("#aboutText").toggleClass("notVisible");
        $("#groupIMG").toggleClass("animated");
        $("#groupIMG").toggleClass("notVisible");

        // $("#aboutBody").css("overflow-y","auto");
    }
    else {
        setTimeout(function() {
            $("#aboutText").toggleClass("notVisible");
            $("#groupIMG").toggleClass("notVisible");
        }, 1000);
    }

    setTimeout(function() {
        $("#playButton").toggleClass("notVisible");
        setTimeout(function() {
            $("#playButton").toggleClass("bounceIn");
        },1000);
    }, 1000);

    $("#playButton").hover(function(){
        $("#playButton").toggleClass("pulse");
    });
});