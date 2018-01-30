var orm = require("../config/orm.js");

var notes = {
    saveComment: (data,cb) => {
        /////////////////////////////////////////////////
        // saves the comment 
        /////////////////////////////////////////////////
        console.log("from notes/saveComment " +data)  ;
        orm.saveComment(data, (res) => {
          console.log("from saveComment response " + res._id)
          cb(res);
        })// end saveComment    
      },
    getSavedComments: (data,cb) =>{
        //////////////////////////////////////////////////////
        // returns the saved Comments
        /////////////////////////////////////////////////////
        console.log("from notes/getSavedComments" + data.articleKey)
        orm.getSavedComments(data.articleKey,(res)=>{
            console.log("from notes/getSAvedComments response " + JSON.stringify(res))
            cb(res)
        })
    }  ,// end getSavedCommengs
    deleteOneComment: (data,cb) =>{
        //////////////////////////////////////////////////
        // delees the comment
        /////////////////////////////////////////////////
        console.log("from notes/deletetOne - outbount " + JSON.stringify(data));
        orm.deleteOneComment(data,(res) => {
            console.log("from notes/deleteOne response - inbound" + JSON.stringify(res))
            cb(res);
        })// end deleteOneComment
    }
    
    // getNewArticles: function(cb){
    //   /////////////////////////////////////////////////
    //   // alls the all method fromo othe config/orm file 
    //   // and retursn the response through the callback
    //   /////////////////////////////////////////////////
    //   orm.getNewArticles("https://www.economist.com",function(res){
    //     console.log("from scrapedArticle/getNewArticles ")
    //     cb(res);
    //   })
    // },// end all

    // getSavedArticles: function(cb){
    //   /////////////////////////////////////////////////
    //   // gets teh saved articles from mongoose
    //   /////////////////////////////////////////////////
    //   console.log("from scrapedAticles/getSavedArticles ")
    //   orm.getSavedArticles( function(res){
    //     console.log("from scrapedArticle/getSavedArticles " + res)
    //     cb(res)
    //   })
    // },// end saved
    // getSavedArticleCount: function(cb){
    //   /////////////////////////////////////////////////
    //   // gets the count of the page for the index page.
    //   /////////////////////////////////////////////////
    //   console.log("from scrapedArticles/getSavedArticleCount")
    //   orm.getSavedArticleCount( function(res){
    //     console.log("from scrapedArticle/getSavedArticleCount " + res)
    //     cb(res)
    //   })
    // },// end getSAvedArticleCount

    // saveSelectedArticle: function(data,cb){
    //   /////////////////////////////////////////////////
    //   // takes the json object data and sends to the ORM for inserting into moongoose
    //   /////////////////////////////////////////////////
    //   console.log("from scrapedArtiles/saveSelectedArticle")
    //   orm.saveSelectedArticle(data, function(res){
    //     console.log("from saveSelectedArticle " + res._id)
    //     cb(res)
    //   })// end orm.saveSelecteedArticle
    // },// end saveSelectedArticle

    // saveComment: (data,cb) => {
    //   /////////////////////////////////////////////////
    //   // saves the comment 
    //   /////////////////////////////////////////////////
    //   console.log("from articles/saveComment")  ;
    //   orm.saveComment(data, (res) => {
    //     console.log("from saveComment response " + res._id)
    //     cb(res);
    //   })// end saveComment    
    // }
}// end scrapedArticle

module.exports = notes;