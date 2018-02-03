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
/*----------------*/

var hashtagArray = [
  { q: "#banana", count: 100 },
  { q: "#apple", count: 100 },
  { q: "#orange", count: 100 },
];

var textResultArray = [];
var hashtag = "";

function grabTweets() {
  var randomInt = getRandomInt(0, hashtagArray.length - 1);
  var hashtag = hashtagArray[randomInt].q;
  T.get("search/tweets", hashtagArray[randomInt], function (
    err,
    data,
    response
  ) {
    var tweetArray = data.statuses;
    var textResultArray = [];

    //loops until either it finds 4 valid results or reaches end of the tweet array
    for (i = 0; textResultArray.length != 4 && i < tweetArray.length; i++) {
      // console.log("Tweet[" + i + "] : " + tweetArray[i].text);
      if (tweetArray[i].text.search(hashtag) != -1) {
        textResultArray.push(
          tweetArray[i].text.replace(hashtag, "#GUESS-THE-HASHTAG")
        );
      }
    }

    if (textResultArray.length != 4) {
      console.log("Didn't get 4 valid results..");
    }

    var result = { result: textResultArray, hashtag: hashtag };
    // !!!!! then pass result to web page somehow !!!!!
  });
}

grabTweets();

app.get("/", function (req, res) {
  res.render("pages/index", {
    results: textResultArray,
    hashtag: hashtag
  });
});

app.listen(3000, function () {
  console.log("Server has Started!");
});
