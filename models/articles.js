var orm = require("../config/orm.js");

var articles = {

    getNewArticles: function(cb){
      /////////////////////////////////////////////////
      // alls the all method fromo othe config/orm file 
      // and retursn the response through the callback
      /////////////////////////////////////////////////
      orm.getNewArticles("https://www.economist.com",function(res){
        console.log("from scrapedArticle/getNewArticles ")
        cb(res);
      })
    },// end all

    getSavedArticles: function(cb){
      /////////////////////////////////////////////////
      // gets teh saved articles from mongoose
      /////////////////////////////////////////////////
      console.log("from scrapedAticles/getSavedArticles ")
      orm.getSavedArticles( function(res){
        console.log("from scrapedArticle/getSavedArticles " + res)
        cb(res)
      })
    },// end saved
    getSavedArticleCount: function(cb){
      /////////////////////////////////////////////////
      // gets the count of the page for the index page.
      /////////////////////////////////////////////////
      console.log("from scrapedArticles/getSavedArticleCount")
      orm.getSavedArticleCount( function(res){
        console.log("from scrapedArticle/getSavedArticleCount " + res)
        cb(res)
      })
    },// end getSAvedArticleCount

    saveSelectedArticle: function(data,cb){
      /////////////////////////////////////////////////
      // takes the json object data and sends to the ORM for inserting into moongoose
      /////////////////////////////////////////////////
      console.log("from scrapedArtiles/saveSelectedArticle")
      orm.saveSelectedArticle(data, function(res){
        console.log("from saveSelectedArticle " + res._id)
        cb(res)
      })// end orm.saveSelecteedArticle
    },// end saveSelectedArticle

    deleteArticle: (data,cb) => {
      /////////////////////////////////////////////////////
      // deletes the specific aritcle per the id
      /////////////////////////////////////////////////////
      console.log("from articles/deleteArticle - outbound " + JSON.stringify(data._id));
      orm.deleteArticle(data,(res) => {
          console.log("from notes/deleteOne response - inbound" + JSON.stringify(res));
          cb(res);
      })// end deleteOneComment
    }

}// end scrapedArticle

module.exports = articles;
