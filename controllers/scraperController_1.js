//
// based upon the MVC example..
//
var express = require("express");
var cheerio = require("cheerio");

var router = express.Router();

// for the htmol request..
var request = require("request");
var zlib    = require("zlib");


// Import the model (article.js) to use its database functions.
// this is the mongoose db
//var article = require("../models/articles.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  // put in call to db..
  //
    res.render("index");
});

router.get("/api/getArticles/", function(req, res) {
    // cat.all(function(data) {
    //   var hbsObject = {
    //     cats: data
    //   };
    //   console.log(hbsObject);
    //   res.render("index", hbsObject);
    // });

    // create teh html objecgt tfrom the URL request
    // var headers = {

    //     "accept-charset" : "ISO-8859-1,utf-8;q=0.7,*;q=0.3",
    //     "accept-language" : "en-US,en;q=0.8",
    //     "accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    //     "user-agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
    //     "accept-encoding" : "gzip,deflate",
    // };
    var scrapedArticles = [];
    var tstURL = {
            url: 'https://www.economist.com/',
            method: 'GET',
            gzip: true
    }
//    request({method:'GET',uri: 'https://www.economist.com',gzip: true} ,function(err, res, html){
    request(tstURL ,function(err, res, html){

        // jquery to search thru the doc.. 
        var cntr = 0;
        if (!err){
//            console.log("headers " + (res.headers));
            const $ = cheerio.load(html);
            //console.log(html);
            // var buffer = Buffer(html);
            // console.log(buffer.toString('base64'));
        //   console.log(html);
        // json object of scrapted articles
            $("article").each(function(i,element){

                var title=$(element).children("a").text();
                // getting the "lasterst updates"
                if (title.indexOf("div") <= 0){
                    // console.log("aa " + title)
                    var info = title;
                    var link =$(element).children("a").attr("href");

                    // console.log("aa " + info)
                    // console.log("bb " + link)
                    // console.log("---------")
                    // pusing link and title into json object 
                    scrapedArticles.push({

                        articleTitle: info,
                        articleLink : link
                    })
                } else {
//                    var divTitle = $(element).children("a").children("div").children("img").html();
                    var divTitle = $(element).children("a").children("div").html();
                    // console.log("cc " + divTitle)

                }


                //if ($(title).hasClass('component-image')){
            //    if ($(title).hasClass('component-image')){
            //     console.log("bb" + $(title).attr("class"));
            //     }
                // latest updates..
                // if (title.indexOf("div")< 0)
                // console.log(title)
                // // for the bigger areas.
                // // if (title.indexOf("div")>0){
                // //     console.log(title)
                // //     console.log("aaa " + $(title).children("img").attr("src"))
                // // }

                // if (title.indexOf("div") < 0){
                //     // var link =$(element).children("a").attr("href");
                //     // var img  =$(element).children("a").children("div").children("div").children("div");
                // // console.log(title)
                //     // console.log("aa" + title)
                //     // console.log("xx " + link)
                //     // console.log("zz" + img)

                // }
         }) // end each
         console.log("got to her after loop")
        }// end !err
        // console.log(html)
        // $("article").each(function(i,element){
        //     cntr++;
        //     console.log("xx")

        // })
        // console.log(`numbr of anhors ${cntr}`)
    })// end request..



    // mongo/mongoos call goes here..
    var tstInfo = {
        tst: "hello"
    }
    console.log("got to the api call")
    res.json({tst: tstInfo.tst})
  });



// Export routes for server.js to use.
module.exports = router;
