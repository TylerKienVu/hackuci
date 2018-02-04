var roundNumberLimit;
var currentRound = 1;
var currentPoints = 0;

$( document ).ready(function() {
    roundNumberLimit = document.getElementById("tweetData").childElementCount + 1;
    toggleAllTweets(roundNumberLimit);
    toggleTweet(currentRound);
});

function check() {
    if (currentRound == roundNumberLimit){
        return;
    }
    var hashtagSelector = "#tweetData div:nth-child(" + currentRound + ") h2:first-child";
    var currentHashtag = $(hashtagSelector).text().trim();
    var nameValue = document.querySelector("#answerBox").value.toLowerCase();

    if (nameValue == currentHashtag) {
        // currentPoints += 10;
        // updatePoints();        
        alert("Correct!");
        toggleTweet(currentRound);
        currentRound++;
        if (currentRound == roundNumberLimit) {
            alert("Game Over...\nPoints: " + currentPoints);
            $("#answerBox").val("");                        
        }
        else {
            toggleTweet(currentRound);
            $("#answerBox").val("");            
        }
    }
    else {
        // currentPoints -= 5;
        // updatePoints();
        alert("Wrong!");
        $("#answerBox").val("");
    }
}

function toggleTweet(childNumberPosition) {
    var selector = "#tweetData div:nth-child(" + childNumberPosition + ")";
    $(selector).toggle();
}

function toggleAllTweets(roundNumberLimit) {
    for(var i = 1; i <= roundNumberLimit; i++){
        var selector = "#tweetData div:nth-child(" + i + ")";
        $(selector).toggle();
    }
}

function updatePoints() {
    $("#totalPoints").text("Total Points: " + currentPoints);
}