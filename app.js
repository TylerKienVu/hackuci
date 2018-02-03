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

var query = { q: "#banana ", count: 4 };

T.get("search/tweets", query, function(err, data, response) {
  // console.log(data.statuses[0].text);
  console.log(data);
});

app.get("/", function(req, res) {
  res.send("This worked");
});

// app.listen(3000, function() {
//   console.log("Server has Started!");
// });
