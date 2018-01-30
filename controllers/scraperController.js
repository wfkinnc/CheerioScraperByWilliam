//
// based upon the MVC example..
//
var express = require("express");
// var cheerio = require("cheerio");

var router = express.Router();

// to get mongoose..
var mongoose = require("mongoose");

// Import the model (article.js) to use its database functions.
// this is the mongoose db
var articles = require("../models/articles.js");
var notes    = require("../models/notes.js")

// imports the SavedArticles and Site Dates.
// var db = require("../models");

// Create all our routes and set up logic within those routes where required.
// first route for index which get the existing count
router.get("/", function(req, res) {
  //////////////////////////////
  // index rout, makes a call to the db go get the counts
  //////////////////////////////
  console.log("from scraperController/index route");
  //commong module to referseh the index page with the saved article count.
  getCount(req, res)
});

function getCount(req, res){

    var retArticleCount = {};
    articles.getSavedArticleCount(function(dataCount){
        //populating the artObject w data from the all function in scrapedArticles
        retArticleCount = {
            count: dataCount
        }// end art
        console.log("from scraper controller (getSavedArticleCounts)" + retArticleCount.count)
        res.render("index", {retArticleCount});
    })

}
router.get("/api/getSavedArticles",function(req,res){
    ////////////////////////////////////////////////////////////////
    // retrieved save articles from mongoose
    ////////////////////////////////////////////////////////////////
    console.log("from scrapedController/api/getSavedArticles route");
    var savedArtObject = {};
    articles.getSavedArticles(function(data){
        res.render("index",data);
    })// end getSAvedArticles

})// end get api/getSavedArticles

router.get("/api/getNewArticles/", function(req, res) {
    ////////////////////////////////////////////////////////////////
    // the all function make a cheerio scape call through
    // models/scrapedArtiles.js file
    // and returns the res.json object as part of teh response
    ////////////////////////////////////////////////////////////////
    articles.getNewArticles(function(data){
        //populating the artObject w data from the all function in scrapedArticles
        var artObject = {
            articles: data
        }// end art
        // response w/ teh json objecgt
        res.json(artObject);
    })
}); // end route.get (api/getNewArticle)

router.post("/api/saveSelectedArticle", function(req,res){
    ////////////////////////////////////////////////////////////////
    // saves teh selecte artilce into mongoose
    ////////////////////////////////////////////////////////////////
    console.log(`from scraperController api/saveSelectedArtcle ${ req.body.title}`)
    const passArticleInfo = {
        title: req.body.title,
        link: req.body.link
    }
    articles.saveSelectedArticle(
        passArticleInfo,function(insertResult){
        var resultObject = {
            result: insertResult
        }
        console.log("from scraper controller (saveSelectedArticles)" + resultObject.result._id);
        res.json(resultObject)
    })
});// end scrapedArticles.
// router.get("/api/getSavedComments/:articleKey",(req,res)=>{
router.post("/api/getSavedComments",(req,res)=>{
////////////////////////////////////////////////////////////////
// GEtting saved Comments for the passed article key
// the article key is a foreign key to the articles
///////////////////////////////////////////////////////////////
// console.log("from scraperController/getSavedComments  "  + req.params.articleKey)
console.log("from scraperController/getSavedComments -outbound "  + (JSON.stringify(req.body)));

const passCommentInfo = {
    articleKey: req.body.articleKey
}
    // notes.getSavedCpassCommentInfoomments( req.params.articleKey,(commentResults)=>{
    //     var cmmtResultObject ={
    //         savedComments: commentResults
    //     }

    notes.getSavedComments( passCommentInfo,(commentResults)=>{
        var cmmtResultObject ={
            savedComments: commentResults
        }        
        console.log("from scraperController (getSAvedComments) - inbound " + JSON.stringify(cmmtResultObject));
        res.json(cmmtResultObject);

    })// end notes/getSavedComments
}); // end get(api/getSaveComments)
router.post("/api/saveComment", function(req,res){
////////////////////////////////////////////////////////////////
// saves the selected Comment into mongoose
////////////////////////////////////////////////////////////////
    console.log("from scraperController/saveComment  " + req.body.id);
    const passCommentInfo = {
        articleKey: req.body.id,
        note: req.body.cmmnt
    }
    console.log(passCommentInfo)
    notes.saveComment(passCommentInfo, (cmmtInsertResult)  => {
            const cmmtResultObject = {
                result: cmmtInsertResult
            }
            console.log("from scraperController (saveComment) " + cmmtResultObject.result._id )
        })    // end notes.saveComment
    });// end post api/saveComment 
    
router.delete("/api/deleteOneComment/:cmmntId", function(req,res){
    ////////////////////////////////////////////////////////////////
    // saves the selected Comment into mongoose
    ////////////////////////////////////////////////////////////////
        console.log("from scraperController/deleteOneComment " + req.params.cmmntId);
        const passDeleteOneCommentId = {
            _id: req.params.cmmntId,
        }
        notes.deleteOneComment(
            // passCommentInfo, function(insertResult){}// end fcn
            passDeleteOneCommentId, ( cmmtDeleteOneResult) => {
                const cmmtDeleteOneResultObject = {
                    result: cmmtDeleteOneResult
                }
                console.log("from scraperController (deleteOnceComment) " + cmmtDeleteOneResult )
                res.json(cmmtDeleteOneResultObject);
            }
        )    // end scrapedArticles.saveComment    
});// end save seleced ommengt


router.get("/api/deleteArticle/:articleId", function(req,res){
    ////////////////////////////////////////////////////////////////
    // saves the selected Comment into mongoose
    ////////////////////////////////////////////////////////////////
        console.log("from scraperController/:deleteArticleId " + req.params.articleId);
        const passDeleteArticle = {
            _id: req.params.articleId,
        }
        console.log(passDeleteArticle)
        articles.deleteArticle( passDeleteArticle, ( artDeleteResult) => {
                const artDeleteResultObject = {
                    result: artDeleteResult
                }
                console.log("from scraperController (deleteOnceComment) - return " + artDeleteResult )
                //commong module to referseh the index page with the saved article count.
                getCount(req,res)
            }
        )    // end scrapedArticles.saveComment    
});// end deleteArticle
module.exports = router;
