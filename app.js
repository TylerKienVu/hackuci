var express = require("express"),
  bodyParser = require("body-parser"),
  Twit = require("twit");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

var T = new Twit({
  consumer_key: "0eCmgHUU74uD0hMM3zRRABvG3",
  consumer_secret: "As07P8NYUK2lGSLGm7xL0B27v7aFqKwq0XHr2CULBBQ6HSi6bU",
  access_token: "959720804064813056-QKFCzftg275ZQosakTyAYHxvyTs8lJh",
  access_token_secret: "ns4qkDijmJOfmJXkNjdYHJKZ8RP9zYoJJCAKtdxNym1Z2",
  timeout_ms: 60 * 1000 // optional HTTP request timeout to apply to all requests.
});

/*------------Core Function------------*/

/*Helper-Functions*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getWordFromBeginningIndex(word, index) {
  var result = "";
  for(var i = index; i < word.length; i++){
    var character = word.charAt(i);
    if(character == " " || character == "\n") {
      return result;
    }
    else {
      result += word.charAt(i);
    }
  }
  return result;
}

function deleteAllLinks(string) {

  var result = string;
  var linkCheckIndex = string.indexOf("https");
  while(linkCheckIndex != -1) {
      result = result.replace(getWordFromBeginningIndex(result,linkCheckIndex),"");
      linkCheckIndex = result.indexOf("https");
  }
  return result;
}

/*----------------*/

var hashtagArray = [
  { q: "#games filter:safe -filter:retweets", count: 100 },
  { q: "#apple filter:safe -filter:retweets", count: 100 },
  { q: "#orange filter:safe -filter:retweets", count: 100 },
  { q: "#android filter:safe -filter:retweets", count: 100 },
  { q: "#piano filter:safe -filter:retweets", count: 100 },
  // { q: "#guitar filter:safe -filter:retweets", count: 100 },
  // { q: "#ootd filter:safe -filter:retweets", count: 100 },
  // { q: "#music filter:safe -filter:retweets", count: 100 },
  // { q: "#birthday filter:safe -filter:retweets", count: 100 },
  // { q: "#christmas filter:safe -filter:retweets", count: 100 },
  // { q: "#birthday filter:safe -filter:retweets", count: 100 },
  // { q: "#food filter:safe -filter:retweets", count: 100 },
  // { q: "#fitness filter:safe -filter:retweets", count: 100 },
  // { q: "#family filter:safe -filter:retweets", count: 100 },
  // { q: "#dance filter:safe -filter:retweets", count: 100 },
  // { q: "#beach filter:safe -filter:retweets", count: 100 }
];

var resultObjectArray = [];

function grabTweets(index) {
  var hashtag = hashtagArray[index].q.split(" ")[0];
  var arrayToPush = []
  T.get("search/tweets", hashtagArray[index], function (
    err,
    data,
    response
  ) {
    var tweetArray = data.statuses;

    //loops until either it finds 4 valid results or reaches end of the tweet array
    for (var i = 0; arrayToPush.length != 4 && i < tweetArray.length; i++) {
      // console.log("Tweet[" + i + "] : " + tweetArray[i].text);
      var matchQuery = tweetArray[i].text.match(new RegExp(hashtag + " ","i")); 
      // console.log("matchQuery: " + matchQuery);
      if (tweetArray[i].text.search(matchQuery) != -1 && tweetArray[i].lang == "en") {

        //delete link if there is a link
        var stringToPush = tweetArray[i].text.replace(matchQuery, "#GUESS-THE-HASHTAG ");
        stringToPush = deleteAllLinks(stringToPush);

        // console.log(stringToPush);
        arrayToPush.push(stringToPush);
      }
    }

    if (arrayToPush.length != 4) {
      console.log("Didn't get 4 valid results..");
      console.log(hashtag);
      return;
    }
    var resultObject = { resultArray: arrayToPush, hashtag: hashtag };
    resultObjectArray.push(resultObject);
  });
}

//Still have to implement randomness
for(var i = 0; i < hashtagArray.length; i++){
  grabTweets(i);
}

//routes
app.get('/', function(req, res){
  res.render("pages/index")
});

app.get('/about', function(req, res){
  res.render("pages/about")
});

app.get("/gamescreen", function (req, res) {
  res.render("pages/gamescreen", {
    results: resultObjectArray
  });
});

//localhost:3000
app.listen(3000, function () {
  console.log("Server has Started!");
});
