const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const app = express();
var PORT = process.env.PORT || 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home");
});
require("./routes/apiRoutes")(app);

var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/newsScraperdb";

app.listen(PORT, function() {
  console.log("App running on port " + PORT);
  console.log("http://localhost:" + PORT);
});
