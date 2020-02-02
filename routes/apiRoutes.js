const db = require("../models");

const axios = require("axios");
const cheerio = require("cheerio");

var mongo = require("mongojs");

module.exports = app => {
  // A GET route for scraping the Dallas Morning News website
  app.get("/scrape", function(req, res) {
    // First we grab all of the articles if there are any, then delete all of them so we prevent duplicates
    db.Article.deleteMany({})
      .then(function() {
        console.log("Any existing articles deleted");
      })
      .catch(function(err) {
        // If an error occurrs, log it
        console.log(err);
      });

    axios.get("https://www.dallasnews.com/").then(function(response) {
      // Load that into cheerio and save it to $ var
      var $ = cheerio.load(response.data);

      // For each article tag execute the following
      $("article").each(function(i, element) {
        // Create an empty result object
        var result = {};

        result.title = $(this)
          .children("h2")
          .children("a")
          .text(); // Title Text
        result.link = $(this)
          .children("h2")
          .children("a")
          .attr("href"); // Link to Dallas Morning News article
        result.image = $(this)
          .children("a")
          .children("div")
          .children("img")
          .attr("src"); // Image Source
        result.saved = false;
        // console.log(result);
        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
        res.end();
      });
    });
  });
};
