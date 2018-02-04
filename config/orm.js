////////////////////////////////
// for cheerio
////////////////////////////////
var cheerio = require("cheerio");

// for the html request..
var request = require("request");
var zlib    = require("zlib");

////////////////////////////////
// for the environment parameters
////////////////////////////////

require('dotenv').config({path: './config/.env'});
////////////////////////////////
// For Mongoose
////////////////////////////////
var mongoose = require("mongoose");

////////////////////////////////////////////////////////////////
// connects to Mongoose DB
////////////////////////////////////////////////////////////////
mongoose.Promise = Promise;
// mongoose.connect("mongodb://localhost/scrapedarticles",{
mongoose.connect(process.env.urlMongoose,{
  useMongoClient: true
})
// // imports the SavedArticles and Site Dates.
var db = require("../models");


var orm = {
    getNewArticles: function(url, cb){
    ///////////////////////////////////////
    // Retrieves Nea Articles thru Cheerio
    // creates the url
    // preforms a request on the url
    // gzip need to be set to true because the 
    // response is zipped.
    ///////////////////////////////////////
        // the URL info for the request
        console.log(url)
        const passURL = {
                        url: url,
                        method: 'GET',
                        gzip: true
        }

            request(passURL ,function(err, res, html){

                if (!err){
                    const $ = cheerio.load(html);
                    var scrapedArticles = [];
                    $("article").each(function(i,element){                        
                    // getting article info
                    var title=$(element).children("a").text();
                        // getting the "lasterst updates"
                        if (title.indexOf("div") <= 0){
                            var info = title;
                            var link =$(element).children("a").attr("href");

                            scrapedArticles.push({
                                articleTitle: info,
                                articleLink : link
                            })// end push
                        }; // end if (title)
                    })// ebd $.each
                    cb(scrapedArticles);
                } // end $err   
            })// end request
    }, // end all function

    getSavedArticles: function(cb){
    /////////////////////////////////////////////
    // gets saved articles
    // uses the find method
    /////////////////////////////////////////////
        //console.log(passDb)
        db.SavedArticles 
        .find({})
        .then(function(retArticles){
            var dataStatus = {
                status:true
            };
            if (retArticles.length ===0){
                retArticles = {
                    title: "There are No Saves articles yet..",
                }
                dataStatus = {
                    status:false
                } ;
                //res.json(resArticles)
            }

            cb({retArticles,dataStatus})
        })
        .catch(function(err){
            console.log("error from orm.getSAvedArticles" + err)
        })

    },// end getSavedArticles

    getSavedArticleCount: function ( cb){
    //////////////////////////////////////////////
    // gets savd article count
    // uses the count method
    //////////////////////////////////////////////
        console.log("from orm/getSavedArticleCount");
        db.SavedArticles
        .count()
        .then(function(retCount){
            console.log(" count from ORM is " + retCount);
            cb(retCount)
        })
        .catch(function(err){
            console.log("error from orm.getSavedArticleCount " + err);
        })// end promises
    }, // end getSavedArticleCount
    saveSelectedArticle: function ( passData, cb){
    /////////////////////////////////////////////
    // Saves teh selected article into mongoos with the 
    // create method
    /////////////////////////////////////////////
        console.log("from orm/saveSelectedArcicle " + passData)
        //JSON.stringify(passData));
        db.SavedArticles
        .create(passData)
        .then(function(savedArticle){
            //console.log(savedArticle)
            console.log("add complete");
            cb(savedArticle)
        })
        .catch(function(err){
            console.log("error from orm.saveSelectedArticle" + err);
        })
    },// end saveSeledctedArticle

    saveComment: (passCommentData,cb) => {
    /////////////////////////////////////////////
    // save Comment into mongoose db
    // uses a create
    /////////////////////////////////////////////   
    console.log("fromm orm/saveComment " + JSON.stringify(passCommentData));
    db.SavedNotes
        .create(passCommentData)
        .then ((savedComment) =>{
            console.log("add comment complete");
            cb(savedComment)
        })// end then
        .catch((err)=>{
            console.log("error from orm.saveComment " + err)
        })// end error
    },// end saveComments

    deleteOneComment: (passOneDelData,cb) => {
    //////////////////////////////////////////////////////
    // deletes one comment fromm the list
    //////////////////////////////////////////////////////
    console.log("from orm.deleteOneComment - outbound " + passOneDelData.id)
    db.SavedNotes
        .deleteOne({"_id":passOneDelData._id})
        .then((delResult) => {
            console.log("delete one complete");
            cb(delResult)
        })
        .catch((err) =>{
            console.log("error from orm.deleteOneComment " + err)
        })// end deleteOneComments
    },// end 
    deleteAllComments: (passAllDelData,cb)=>{

    },// end deleteONeComment
    getSavedComments: (articleKey,cb)=>{
    //////////////////////////////////////////////////////////
    // gets saved commens
    // db.savednotes.find({"articleKey":ObjectId("5a6dfc8135059b2db018776f")})
    //////////////////////////////////////////////////////////
        console.log(" from orm.getSavedComments")
        db.SavedNotes
        .find({"articleKey": articleKey})
        .then((cmmtResults) =>{
            console.log("from orm.getSavedComments complete")
            cb(cmmtResults)
        })
        .catch((err)=>{
            console.log("error from orm.getSavedNotes " + err)            
        })
    },// end  getSavedCommments
    deleteArticle: (passArticleData,cb)=>{
    ///////////////////////////////////////////////////////////
    // deletes article    
    //////////////////////////////////////////////////////////
        console.log(" from orm.deleteArticle - outbound " + passArticleData._id);
        db.SavedArticles
        .deleteOne({"_id": passArticleData._id})
        .then((delResult) =>{
            console.log(" from orm.deleteArticle - inboud - delete complete  " + delResult);
            cb(delResult);
        })            
        .catch((err) => {
            console.log("error from orm.deleteArticle " + err)
        })// end delte
    }// end deleteArticle
} // end  orm

// Export the orm object for the model (cat.js).
module.exports = orm;