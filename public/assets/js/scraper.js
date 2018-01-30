// the jquery methods which perform action.
//
$(document).ready(function(){

        // $("[data-toggle='modal']").click(function(event){
        // /////////////////////////////////////////////////
        // // launches the save function and puts the return data into the modal
        // /////////////////////////////////////////////////
        // })// end 

        $("#btn-get-new-articles").click(function(event){
        event.preventDefault();
        ////////////////////////////////////////////////////
        // a ajax get command to retrieve the aritcles through 
        // cheerio
        // the response is added ot the article-values div thru jquery
        ////////////////////////////////////////////////////
        emptyDiv("new-article");

        $.ajax("/api/getNewArticles",{
            type: "GET"
        }).then(
            function(result){
            $("#article-values").empty();
            var hdr = $("<h4>");
            hdr.html("Saved Articles")
            $("#new-article").append(hdr);

            for (var index in result.articles){
                //var paraText = $("<p></p>").html("<a href='https://www.economist.com/"+result.articles[index].articleLink +"' target='new'>" + result.articles[index].articleTitle + "</a>");
                //console.log(paraText)

                var link = $("<a>");
                link.attr("href", "https://www.economist.com"+result.articles[index].articleLink);
                link.attr("id","link-"+index)
                link.attr("target", "new");
                link.attr("title", result.articles[index].articleTitle);
                link.text(result.articles[index].articleTitle);
                // link.addClass("link");
                var hldDiv1 = $("<div>");
                hldDiv1.addClass("input-group mb-3");
                // populating the div area of the index page w/ the scraped articles
                var hldDiv2 = $("<div>");
                hldDiv2.addClass("input-group-append");

                var hldBtn = $("<button>");
                hldBtn.addClass=("btn btn-outline-secondary saveButton nav-link");
                hldBtn.attr("type", "button");
                hldBtn.attr("data-title", result.articles[index].articleTitle)
                hldBtn.attr("data-link", result.articles[index].articleLink)
                hldBtn.attr("data-toggle","modal");
                hldBtn.attr("data-target","#exampleModal");
                hldBtn.attr("id",index);
                hldBtn.text("Save this Article");

                hldDiv2.append(hldBtn);
                hldDiv1.append(hldDiv2) 
                $("#new-article").append(link);
                $("#new-article").append(hldDiv1);
                $("#new-article").append("<hr>");
                // populating the modal w/ info about the scraped
                $("#article-values").empty();
                $("#article-values").html("<b>Load is complete with " + result.articles.length +" articles.</b>")
            }
        });

    }); // end data-toggle


    $("#new-article").on("click", "button", function(){
        ////////////////////////////////////////////////////////////////////////
        // get the savedArticlesparamters which are part ot the submit button
        // json objecg to send to the controller and then to the ORM
        ////////////////////////////////////////////////////////////////////////
    
        console.log("from scraper.js/new-article clice - send")
        // clears part of the modal and the page
        emptyDiv("add-comment-area");
        emptyDiv("saved-article");
        const saveArticleInfo = {
            title:  $(this).attr("data-title"),
            link: $(this).attr("data-link")
        }
        $.ajax("/api/saveSelectedArticle/",{
            type: "POST",
            data: saveArticleInfo
        })
        .then(function(result){
            console.log("from scraper.js/post to saveSelectedArtile - return " + result  )
         // send parameters to the modal...
            //  $("#article-values").empty();
            emptyDiv("article-values");
            $("#article-values").html("<b>Save is complete with the articles.</b>")
        })// end (api/saveSelectedArticle)
        
    });// end newArticleClick

    // $(".createComments").on("click",function(){
    $("#btn-create-comment").on("click",function(event){
        ///////////////////////////////////////////////////
        // Opens the modal to have elements to add comments
        // also shows saved comments for the article.
        ///////////////////////////////////////////////////
        event.preventDefault();

        console.log("from scraper.js/.deleteArticle - Send ")        

        // gets teh saved comments for the id
        $("#article-values").empty();
        $("#show-comment-area").empty();
        $("#add-comment-area").empty();
        $("#article-values").html("<h6>Existing Notes</h6>");

        const getCommentInfo = {
            articleKey: $(this).attr("data-id")
        };
        // $.ajax("/api/getSavedComments/" + $(this).attr("data-id"),{
        //     type: "GET",
        // })
        console.log("from scraper (.createComments " + JSON.stringify(getCommentInfo));
        $.ajax("/api/getSavedComments",{
            type: "POST",
            data: getCommentInfo
        })
        .then((result) =>{
         
            console.log("from scraper/getSAvedComments - inbout " + JSON.stringify(result))
            var p = "";
            var img = "";
            var orList = $("<ol>");
            for (var index in result.savedComments){

                // p = $("<p>");
                // p.html(index + ". " + result.savedComments[index].note) ;
                // p.css("display","inline");
                var listItem = $("<li>")
                listItem.html(result.savedComments[index].note);
                img = $("<img/>");
                img.attr("src","/assets/images/ic_delete_forever_black_24px.svg");
                img.attr("data-id",result.savedComments[index]._id)
                listItem.append(img)
                orList.append(listItem);
                $("#show-comment-area").append(orList);
            }//end for


        })

        let cmmtDiv1 = $("<div>");
        cmmtDiv1.addClass("input-group mb-3");

        var cmmtDiv2 = $("<div>");
        cmmtDiv2.addClass("input-group-prepend");

        var cmmtSpan1 = $("<span>");
        cmmtSpan1.addClass("input-group-text");
        cmmtSpan1.text("Show Comment");

        var cmmtTextArea1 = $("<textArea>");
        cmmtTextArea1.addClass("form-control");
        cmmtTextArea1.attr("aria-label","With textarea")
        cmmtTextArea1.attr("id","showComments")
     
        let cmmtDiv3 = $("<div>");
         cmmtDiv3.addClass("input-group mb-3");

        var cmmtDiv4 = $("<div>");
        cmmtDiv4.addClass("input-group-prepend");

        var cmmtSpan2 = $("<span>");
        cmmtSpan2.addClass("input-group-text");
        cmmtSpan2.html("<h4>Add Comment</h4>");
        cmmtSpan2.html("<br>");

        var cmmtTextArea2 = $("<textArea>");
        cmmtTextArea2.addClass("form-control");
        cmmtTextArea2.attr("aria-label","With textarea")
        cmmtTextArea2.attr("id","txt-new-comment")
        cmmtTextArea2.attr("placeholder","Add New Comment");
        
        var saveImg = $("<img/>");
        saveImg.attr("src","/assets/images/save.svg");
        saveImg.attr("data-id",$(this).attr("data-id"));
        saveImg.attr("id","saveImage")

        // var hldCmmtBtn = $("<button>");

        // hldCmmtBtn.addClass=("btn btn-secondary add-comment");
        // hldCmmtBtn.attr("type", "button");
        // hldCmmtBtn.attr("data-id", ($(this).attr("data-id")));
        // hldCmmtBtn.attr("id","btn-new-comment");
        // hldCmmtBtn.text("Save");

        cmmtDiv2.append(cmmtSpan1);
        cmmtDiv1.append(cmmtDiv2) ;
        cmmtDiv1.append(cmmtTextArea1);

        // // (breakLine);
         cmmtDiv4.append(cmmtSpan2);
         cmmtDiv3.append(cmmtDiv4);
         cmmtDiv3.append(cmmtTextArea2);
        //  cmmtDiv3.append(hldCmmtBtn);
        cmmtDiv3.append(saveImg);
        //  $("add-comment-area").append(hldCmmtBtn);
        //  $("#show-comment-area").append(cmmtDiv1);
 //        $("#show-comment-area").append(cmmtHTML);
        //  cmmtHTML
       $("#add-comment-area").append(cmmtDiv3);

    });//

//     $(".deleteArticle").on("click",function(){
//         ///////////////////////////////////////////////////
//         // Opens the modal to delete the article
//         ///////////////////////////////////////////////////
//         console.log("from scraper.js/.deleteArticle - Send ") 
//         location.reload();       
//         // gets teh saved comments for the id
// //         $("#article-values").empty();
// //         $("#show-comment-area").empty();
// //         $("#add-comment-area").empty();
// //         $("#article-values").html("<h6>Existing Notes</h6>");

// //         const getCommentInfo = {
// //             articleKey: $(this).attr("data-id")
// //         };
// //         // $.ajax("/api/getSavedComments/" + $(this).attr("data-id"),{
// //         //     type: "GET",
// //         // })
// //         console.log("from scraper (.createComments " + JSON.stringify(getCommentInfo));
// //         $.ajax("/api/getSavedComments",{
// //             type: "POST",
// //             data: getCommentInfo
// //         })
// //         .then((result) =>{
         
// //             console.log("from scraper/getSAvedComments - inbout " + JSON.stringify(result))
// //             var p = "";
// //             var img = "";
// //             var orList = $("<ol>");
// //             for (var index in result.savedComments){

// //                 // p = $("<p>");
// //                 // p.html(index + ". " + result.savedComments[index].note) ;
// //                 // p.css("display","inline");
// //                 var listItem = $("<li>")
// //                 listItem.html(result.savedComments[index].note);
// //                 img = $("<img/>");
// //                 img.attr("src","/assets/images/ic_delete_forever_black_24px.svg");
// //                 img.attr("data-id",result.savedComments[index]._id)
// //                 listItem.append(img)
// //                 orList.append(listItem);
// //                 $("#show-comment-area").append(orList);
// //             }//end for


// //         })

// //         let cmmtDiv1 = $("<div>");
// //         cmmtDiv1.addClass("input-group mb-3");

// //         var cmmtDiv2 = $("<div>");
// //         cmmtDiv2.addClass("input-group-prepend");

// //         var cmmtSpan1 = $("<span>");
// //         cmmtSpan1.addClass("input-group-text");
// //         cmmtSpan1.text("Show Comment");

// //         var cmmtTextArea1 = $("<textArea>");
// //         cmmtTextArea1.addClass("form-control");
// //         cmmtTextArea1.attr("aria-label","With textarea")
// //         cmmtTextArea1.attr("id","showComments")
     
// //         let cmmtDiv3 = $("<div>");
// //          cmmtDiv3.addClass("input-group mb-3");

// //         var cmmtDiv4 = $("<div>");
// //         cmmtDiv4.addClass("input-group-prepend");

// //         var cmmtSpan2 = $("<span>");
// //         cmmtSpan2.addClass("input-group-text");
// //         cmmtSpan2.html("<h4>Add Comment</h4>");
// //         cmmtSpan2.html("<br>");

// //         var cmmtTextArea2 = $("<textArea>");
// //         cmmtTextArea2.addClass("form-control");
// //         cmmtTextArea2.attr("aria-label","With textarea")
// //         cmmtTextArea2.attr("id","txt-new-comment")
// //         cmmtTextArea2.attr("placeholder","Add New Comment");
        
// //         var saveImg = $("<img/>");
// //         saveImg.attr("src","/assets/images/save.svg");
// //         saveImg.attr("data-id",$(this).attr("data-id"));
// //         saveImg.attr("id","saveImage")

// //         // var hldCmmtBtn = $("<button>");

// //         // hldCmmtBtn.addClass=("btn btn-secondary add-comment");
// //         // hldCmmtBtn.attr("type", "button");
// //         // hldCmmtBtn.attr("data-id", ($(this).attr("data-id")));
// //         // hldCmmtBtn.attr("id","btn-new-comment");
// //         // hldCmmtBtn.text("Save");

// //         cmmtDiv2.append(cmmtSpan1);
// //         cmmtDiv1.append(cmmtDiv2) ;
// //         cmmtDiv1.append(cmmtTextArea1);

// //         // // (breakLine);
// //          cmmtDiv4.append(cmmtSpan2);
// //          cmmtDiv3.append(cmmtDiv4);
// //          cmmtDiv3.append(cmmtTextArea2);
// //         //  cmmtDiv3.append(hldCmmtBtn);
// //         cmmtDiv3.append(saveImg);
// //         //  $("add-comment-area").append(hldCmmtBtn);
// //         //  $("#show-comment-area").append(cmmtDiv1);
// //  //        $("#show-comment-area").append(cmmtHTML);
// //         //  cmmtHTML
// //        $("#add-comment-area").append(cmmtDiv3);

//     });// end delee


    $("#btn-get-saved-articles").on("click",function(){
        /////////////////////////////////////////////////////////////
        // clearing out the text when the get saved articles button is clicked
        // this is fired in addition to the href 
        /////////////////////////////////////////////////////////////
        emptyDiv("new-article");
    });

    $("#add-comment-area").on("click","img", function(){
        //////////////////////////////////////////////////////////////
        // event on the add-comment.area.button whih adds the comment to mongoose
        //////////////////////////////////////////////////////////////
        console.log("from scraper/add-comment-area " + $(this).attr("data-id") );
        const saveCommentInfo = {

            id: $(this).attr("data-id"),
            cmmnt: $("#txt-new-comment").val()
        }
  
        $.ajax("/api/saveComment",{
            type: "POST",
            data: saveCommentInfo
        })
        .then(function(result){
            console.log("from scraper/add-comment-area return " + result)
            $("#article-values").empty();
            $("#article-values").html("<b>Save is complete with Comment</b>");
            // refreshes the pabe
        })// end ajax

    });

    $("#show-comment-area").on("click","img", function(){
    ////////////////////////////////////////////////////
    // deletes the selected comment
    ////////////////////////////////////////////////////
        console.log("from scraper/show-comment-area with ID:" + $(this).attr("data-id"));
        $.ajax("/api/deleteOneComment/"+$(this).attr("data-id"),{
            type: "DELETE"
            // ,
            // data: $(this).attr("data-id")
        })// end ajax
        .then(result=>{
            console.log("from scraper.js/post to deleteSelectedComment " + result);
            $("#article-values").empty
            $("#article-values").html("<b>Comment was deleted</b>");
            $(".createComments").trigger("click");

        })// end then
    })//end the delte

   
}); // end doc ready

function getInfo(item,index){
    var holdInfo = [item.articleTitle,item.articleLink].join("")
    return holdInfo;
}


function emptyDiv(id){
    // empties the empty div
$("#"+id).empty();
}