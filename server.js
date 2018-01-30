// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");


// Specify the port.
var port = 3000;


// Create an instance of the express app.
var app = express();

// imports the SavedArticles and Site Dates.
var db = require("./models");

// setting static link for public..
app.use(express.static("public"));

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));


// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// setting routes to the scraperController.js file 
var routes = require("./controllers/scraperController.js");

/////////////////////////////////////////////////////////////////
// Data
// creates the mongoose data..
/////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
// connects to Mongoose DB
////////////////////////////////////////////////////////////////
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/scrapedarticles",{
  useMongoClient: true
});

// test for adding'
// var result  = {};

// console.log("trying to add to db")
// result.title="helle1";
// result.link="link1";
// db.SavedArticles
//   .create(result)
//   .then(function(tstArticle){
//     console.log(tstArticle)
//     console.log("add complete");
//   })
//   .catch(function(err){
//     console.log("error " + err);
//   })

// db.SavedArticles
// .count()
// .then(function(retCount){
//   console.log(".. cont " + retCount)
// })
// .catch(function(err){
//   console.log("error" + err)
// })
// end test

app.use("/",routes);

// Initiate the listener.
app.listen(port);
