var roundNumberLimit;
var currentRound = 1;
var currentPoints = 0;
var hintCounter = 0;
var currentlyBannering = false;
var animatingPoints = false;

$( document ).ready(function() {
    roundNumberLimit = document.getElementById("tweetData").childElementCount;

    setTimeout(function() {
        $("#gameMenu").toggleClass("notVisible");
        setTimeout(function() {
            $("#hint").toggleClass("bounceIn");
            $("#submit").toggleClass("bounceIn");
            $("#homeIcon").toggleClass("rubberBand");
            toggleTweet(currentRound);
        }, 1000);
    }, 1000);

    $(document).keypress(function(e) {
        if(e.which == 13) {
            check();
        }
    });

    $("#hint").click(function() {
        insertHint();
    });

    $(".customButton").hover(function() {
        $(this).toggleClass("pulse");
    });

    //doesn't work for some reason. Thinking because the <i> tag changes to an svg
    $("#homeIcon").hover(function() {
        $("#homeIcon").toggleClass("pulse");
    });
});

function check() {
    if (currentRound == roundNumberLimit){
        return;
    }
    var hashtagSelector = "#tweetData div:nth-child(" + currentRound + ") h2:first-child";
    var currentHashtag = $(hashtagSelector).text().trim().slice(1,);
    var nameValue = document.querySelector("#answerBox").value.toLowerCase().replace("#","");

    if (nameValue == currentHashtag) {
        clearHints();
        updatePoints(10);        
        dropDownAlert("correct");
        toggleTweet(currentRound);
        currentRound++;
        if (currentRound == roundNumberLimit) {
            $("#answerBox").val("");    
            setTimeout(function() {
                showPointScreen();
            }, 1000);                    
        }
        else {
            //give time for previous round to fade out
            setTimeout(function() {
                toggleTweet(currentRound);
            }, 1500);
            $("#answerBox").val("");            
        }
    }
    else {
        updatePoints(-4);
        dropDownAlert("wrong");
        $("#answerBox").val("");
    }
}

function toggleTweet(childNumberPosition) {
    var selector = "#tweetData div:nth-child(" + childNumberPosition + ")";
    var currentVisibility = $(selector).css("display");
    if (currentVisibility == "none") {
        $(selector).toggle();
        $(selector).toggleClass("fadeInLeft");
        setTimeout(function(){
            $(selector).toggleClass("fadeInLeft");
        }, 1000);
    }
    else {
        $(selector).toggleClass("fadeOut");
        setTimeout(function() {
            $(selector).toggleClass("fadeOut");
            $(selector).toggle();
        }, 1000);
    }    
}

function toggleAllTweets(roundNumberLimit) {
    for(var i = 1; i <= roundNumberLimit; i++){
        var selector = "#tweetData div:nth-child(" + i + ")";
        $(selector).toggle();
    }
}

function updatePoints(points) {
    $("#totalPoints").text("Points: " + (currentPoints += points));
    
    if(animatingPoints){
        return;
    }
    animatingPoints = true;
    if(points > 0){
        $("#positivePoints").html("+" + points);
        $("#positivePoints").toggle();
        setTimeout(function() {
            $("#positivePoints").toggle();
            animatingPoints = false;
        }, 500);
    }
    else {
        $("#negativePoints").html(points);
        $("#negativePoints").toggle();
        setTimeout(function() {
            $("#negativePoints").toggle();
            animatingPoints = false;
        }, 500)

    }
}

function dropDownAlert(alertId) {
    if(currentlyBannering){
        return;
    }

    currentlyBannering = true;
    $("#" + alertId).toggle();
    $("#" + alertId).toggleClass("slideInDown");
    setTimeout(function() {
        $("#" + alertId).toggleClass("slideInDown");
        $("#" + alertId).toggleClass("slideOutUp");
    }, 2000);
    setTimeout(function() {
        $("#" + alertId).toggleClass("slideOutUp");
        $("#" + alertId).toggle();
        currentlyBannering = false;
    }, 3000);
}

function insertHint() {
    var hashtagSelector = "#tweetData div:nth-child(" + currentRound + ") h2:first-child";
    var currentHashtag = $(hashtagSelector).text().trim().slice(1,);    
    if(hintCounter == currentHashtag.length+1){
        return;
    }
    
    hintCounter++;
    updatePoints(-2);

    if(hintCounter == 1){
        $("#hintContainer").append("<p>Hint: The hashtag has " + currentHashtag.length + " characters" );
    }
    else if(hintCounter == 2) {
        $("#hintContainer").append("<p>Hint: " + currentHashtag.charAt(hintCounter-2) + repeatCharacterNTimes('_',currentHashtag.length-1));
    }
    else {
        var innerHTML = $("#hintContainer p:nth-child(2)").html()
        var indexOfNextSlot = innerHTML.indexOf("_");
        innerHTML = setCharAt(innerHTML,indexOfNextSlot,currentHashtag.charAt(hintCounter-2));
        $("#hintContainer p:nth-child(2)").html(innerHTML);
    }
} 

function clearHints() {
    $("#hintContainer").empty();
    hintCounter = 0;
}

function showPointScreen() {
    $("#gameOverText").html("Your final score is " + currentPoints + " points!");
    $("#pointScreen").toggle();
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function repeatCharacterNTimes(character, n) {
    var result = "";
    for(var i = 0; i < n; i++){
        result += character;
    }
    return result;
}