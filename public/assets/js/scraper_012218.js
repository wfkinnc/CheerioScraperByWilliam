// the jquery methods which perform action.
//
$(document).ready(function(){

    $("[data-toggle='modal']").click(function(event){
        event.preventDefault();
        //
        // a ajax get command to retrieve the aritcles through 
        // cheerio
        // the response is added ot the article-values div thru jquery
        //
        $.ajax("/api/getNewArticles",{
            type: "GET"
        }).then(
            function(result){
            $("#article-values").empty();
            // var htmlDivLink = "";
            // var htmlDivCntrls = "";
            console.log(result.articles.length)
            for (var index in result.articles){
                //var paraText = $("<p></p>").html("<a href='https://www.economist.com/"+result.articles[index].articleLink +"' target='new'>" + result.articles[index].articleTitle + "</a>");
                //console.log(paraText)


                var link = $("<a>");
                link.attr("href", "https://www.economist.com/"+result.articles[index].articleLink);
                link.attr("id","link-"+index)
                link.attr("target", "new");
                link.attr("title", result.articles[index].articleTitle);
                link.text(result.articles[index].articleTitle);
                // link.addClass("link");

                var hldDiv1 = $("<div>");
                hldDiv1.addClass("input-group mb-3");

                var hldInput = $("<input>");
                hldInput.addClass=("form-control");
                hldInput.attr("type", "text");
                hldInput.attr("placeholder","Your Comments");
                hldInput.attr("id","inputId-"+index);

                var hldDiv2 = $("<div>");
                hldDiv2.addClass("input-group-append");

                var hldBtn = $("<button>");
                hldBtn.addClass=("btn btn-outline-secondary tstBtn");
                hldBtn.attr("type", "button");
                hldBtn.attr("data-title", result.articles[index].articleTitle)
                hldBtn.attr("data-link", result.articles[index].articleLink)
                hldBtn.attr("id",index);
                hldBtn.text("Save");

                hldDiv2.append(hldBtn);
                hldDiv1.append(hldInput);
                hldDiv1.append(hldDiv2)


 
                // $(".box").html(link);
                
                // htmlDivCntrls = "<div class='input-group mb-3'>";
                // htmlDivCntrls = htmlDivCntrls + "<input type='text' class='form-control' placeholder='Your Comments' aria-label='Your Comments' aria-describedby='basic-addon2'>";
                // htmlDivCntrls = htmlDivCntrls + "<div class='input-group-append'>";
                // htmlDivCntrls = htmlDivCntrls + "<button class='btn btn-outline-secondary tstBtn' type='button'>Save</button>";
                // htmlDivCntrls = htmlDivCntrls + "</div></div>";
                // $("#article-values").append(htmlDivLink);
                // $("#article-values").append(htmlDivCntrls);
                $("#article-values").append(link);
                $("#article-values").append(hldDiv1);
                $("#article-values").append("<hr>");

            }
        });

    }); // end data-toggle

    $("#article-values").on("click", "button", function(){
        // 
        // getting the values associated w/ the buttons which are from the parent
        // link. the title and text and associated w/ the 
        alert("fix tis  so that it gets the index values from the href..and not from data-attr values from the button")
        console.log($(this).attr("data-title"));
        console.log($(this).attr("id"));
        console.log($( "#inputId-"+$(this).attr("id") ).val());
    })

    $("#tstBtn").click(emptyDiv)




}); // end doc ready

function getInfo(item,index){
    var holdInfo = [item.articleTitle,item.articleLink].join("")
    return holdInfo;
}

function emptyDiv(){
$("#savedArticles").empty();
}