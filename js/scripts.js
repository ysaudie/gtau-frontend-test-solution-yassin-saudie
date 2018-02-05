$(document).ready(function() {
    // create html template for each product description title
    var sectionTitleTemplate = "<div class='sectionTitle'></div><br />";
    // function that reads the json file and renders the file contents onto the page
    $.getJSON("content/content.json", function(json) {
        $(".titleSection .listingTitle").text(json.title); // sets first listing title from the contents of the file
        $(".productDescription").empty().append(sectionTitleTemplate + json.content[0].description); // sets first product description from the contents of the file
        $(".sectionTitle").text(json.content[0].title); // sets first product description title from the contents of the file
        $(".nextButton .nextButtonTitle").text(json.content[1].title); // sets first title for the next button
        $(".prevButton .prevButtonTitle").text(json.content[json.content.length - 1].title); // sets first title for the previous button
        var nextBtnCount = 1; // begin count for the next button and set to the second value of the json file
        var prevBtnCount = json.content.length - 1; // begin count for the previous button and set to the last value of the json file
		var count = 0; // begin count for product description section and set to the first value of the json file
        // click event for the next button, on click it updates the product description as well as the previous and next buttons
        $(".nextButton").click(function() {
            ++count; // increment count on click
            ++nextBtnCount + 1; // increment count on click and add one
            prevBtnCount = nextBtnCount -2; // replicate next button text, moving the index by -2
            // condition to reset count of buttons
            if (nextBtnCount >= json.content.length){
                nextBtnCount = 0;
                prevBtnCount = json.content.length - 2;
            }
            // condition to reset count of buttons
            if (prevBtnCount <= -1){
                prevBtnCount = json.content.length - 1;
            }
            // condition to reset count of buttons
            if (count === json.content.length){
                count = 0;
            }
            $(".productDescription").empty().append(sectionTitleTemplate + json.content[count].description); // update product description
            $(".sectionTitle").text(json.content[count].title); // update product description title
            $(".nextButton .nextButtonTitle").text(json.content[nextBtnCount].title); // update next button title
            $(".prevButton .prevButtonTitle").text(json.content[prevBtnCount].title); // update previous button title
            $(".productDescription").scrollTop(0); // ensure scrollbar is always starting at the top
        });
        // click event for the previous button, on click it updates the product description as well as the previous and next buttons
        $(".prevButton").click(function() {
            --count; // decrement count on click
            --prevBtnCount - 1; // decrement count on click and remove one
            nextBtnCount = prevBtnCount + 2; // replicate previous button text, moving the index by +2
            // condition to reset count of buttons
            if (prevBtnCount <= -1){
                prevBtnCount = json.content.length - 1;
            }
            // condition to reset count of buttons
            if (nextBtnCount >= json.content.length){
                nextBtnCount = 0;
            }
            // condition to reset count of buttons
            if (count === -1){
                count = json.content.length - 1;
            }
            $(".productDescription").empty().append(sectionTitleTemplate + json.content[count].description); // update product description
            $(".sectionTitle").text(json.content[count].title); // update product description title
            $(".prevButton .prevButtonTitle").text(json.content[prevBtnCount].title); // update previous button title
            $(".nextButton .nextButtonTitle").text(json.content[nextBtnCount].title); // update next button title
            $(".productDescription").scrollTop(0); // ensure scrollbar is always starting at the top
        });
        // click event to expand/collapse the listing
        $("#expandBtn").click(function() {
            // condition to change the expand/collapse icon - using fontawesome
            if($("#expandBtn i").attr("class") === "fas fa-caret-up"){
                $("#expandBtn i").removeClass( "fa-caret-up" ).toggleClass( "fa-caret-down" );
            } else {
                $("#expandBtn i").toggleClass( "fa-caret-up" );
            }
            // function that toggles the expand and collapse of listing
            $(".expandedInfo, .buttonSection").slideToggle();
        });
    });
});