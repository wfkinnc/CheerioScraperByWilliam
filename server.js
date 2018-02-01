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


// acct name: wfkinnc
// email: wkassebaum@rocketmail.com
// username: wfkinnc
// pswd: Hk426624
// db - wfk-bootcamp

// To connect using the mongo shell:
// mongo ds239387.mlab.com:39387/wfk-bootcamp -u <dbuser> -p <dbpassword>
// To connect using a driver via the standard MongoDB URI (what's this?):

// mongodb://<dbuser>:<dbpassword>@ds239387.mlab.com:39387/wfk-bootcamp



app.use("/",routes);

// Initiate the listener.
app.listen(port);
