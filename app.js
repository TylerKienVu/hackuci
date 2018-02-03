var express = require("express"),
  bodyParser = require("body-parser"), 

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.send("This worked");
});

app.listen(3000, function() {
  console.log("Server has Started!");
});
