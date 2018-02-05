$(document).ready(function() {
    setTimeout(function() {
        $("#aboutText").toggleClass("notVisible");
        $("#groupIMG").toggleClass("notVisible");
    }, 1000);

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