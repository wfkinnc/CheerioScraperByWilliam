//
// based upon the MVC example..
//
var express = require("express");
// var cheerio = require("cheerio");

var router = express.Router();

// for the htmol request..
// var request = require("request");
// var zlib    = require("zlib");

// to get mongoose..
var mongoose = require("mongoose");

// Import the model (article.js) to use its database functions.
// this is the mongoose db
var scrapedArticles = require("../models/scrapedArticles.js");

// imports the SavedArticles and Site Dates.

var db = require("../models");

// Create all our routes and set up logic within those routes where required.
// first route for index which get the existing count
router.get("/", function(req, res) {
  //////////////////////////////
  // index rout, makes a call to the db go get the counts
  //////////////////////////////
  console.log("from scraperController/index route")
    var retArticleCount = {};
    scrapedArticles.getSavedArticleCount(function(dataCount){
        //populating the artObject w data from the all function in scrapedArticles
        retArticleCount = {
            count: dataCount
        }// end art
        console.log("from scraper controller (getSavedArticleCounts)" + retArticleCount.count)
        res.render("index", {retArticleCount});
    })
});

router.get("/api/getSavedArticles",function(req,res){
    console.log("from scrapedController/api/getSavedArticles route");
    var savedArtObject = {};
    scrapedArticles.getSavedArticles(function(data){
        res.render("index",data);
    })// end getSAvedArticles

})// end get api/getSavedArticles


// // gets teh full listt of articles
// router.get("/", function(req, res) {
//     // put in call to db..
//     //
//   //   db.SavedArticle
//   //     .find({})
//   //     .then(function(retArticles){
//       var savedArtObject = {};
//       var returnedStatus = {};
//       var returnedDate    = {};
//       scrapedArticles.getSavedArticles(function(data){
//           //populating the artObject w data from the all function in scrapedArticles
//               savedArtObject = {
//               savedArticles: data.retArticles
//           }
//               returnedStatus = {
//               status: data.dataStatus
//           }// end art
//               returnedDate = {
//               date: "hello"
//           }
//           res.render("index", {savedArtObject,returnedStatus,returnedDate});
//       })
//           //res.render("index", retArticles);
  
//       // })
//       // .catch(function(err){
//       //     console.log(err)
//       // })
//   });

router.get("/api/getNewArticles/", function(req, res) {
    //
    // the all function make a cheerio scape call through
    // models/scrapedArtiles.js file
    // and returns the res.json object as part of teh response
    //
    scrapedArticles.getNewArticles(function(data){
        //populating the artObject w data from the all function in scrapedArticles
        var artObject = {
            articles: data
        }// end art
        // response w/ teh json objecgt
        res.json(artObject);
    })
}); // end route.get (api/getNewArticle)

router.post("/api/saveSelectedArticle", function(req,res){
    //console.log(req)
    console.log(`from scraperController api/saveSelectedArtcle ${ req.body.title}`)
    const passArticleInfo = {
        title: req.body.title,
        link: req.body.link
    }
    scrapedArticles.saveSelectedArticle(
        // [req.body.title,
        // req.body.link],function(insertResult){
        passArticleInfo,function(insertResult){
        var resultObject = {
            result: insertResult
        }
        console.log("from scraper controller (saveSelectedArticles)" + resultObject.result._id);
        res.json(resultObject)
 
    })// end scrapedArticles.



});// end router.post("api/saveSelctedArticle")

module.exports = router;
