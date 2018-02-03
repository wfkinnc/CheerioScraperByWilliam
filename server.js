// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

require('dotenv').config({path: './config/.env'});

// Specify the port.
//var port = process.env.PORT|| 3000;
var port = process.env.PORT || 3000;

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
console.log(process.env.urlMongoose)
 mongoose.connect(process.env.urlMongoose,{
  useMongoClient: true
});


app.use("/",routes);

// Initiate the listener.
app.listen(port);
