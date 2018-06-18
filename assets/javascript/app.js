$(document).ready(function () {
    //declaring the global variables
    var topic = "";
    var newShow = "";
    var shows = ["Lord of the Rings", "Game of Thrones", "Narnia", "Star Wars", "Star Trek", "Pirates Of The Caribbean", "Disney", "Harry Potter", "Greys Anatomy", "King Arthur", "The Hobbit"];
    
    addBtns();                                              

    function addBtns() {                                    
        $(".buttonDiv").empty();                            
        for (var i = 0; i < shows.length; i++) {            

            topic = shows[i];                               
            var topics = topic.replace(/\s+/g, '-');        
            var button = $("<button>");                     
            button
                .addClass("btn btn-success topicBtn")       
                .attr("data-name", topics)                  
                .text(topic);                               
            $(".buttonDiv").append(button);

           
        } 

    }

    $(".searchBtn").on("click", function (event) {
        event.preventDefault();                             

        newShow = $("#search-input").val().trim();          
        shows.push(newShow);                                

        addBtns();                                          
    }); //end of the search button function

    function clearIt() {
        $(".gifDiv").html("");                              
    } //end clearIt function

    //make this its own function
    $(document).on("click", ".topicBtn", function () {      
        clearIt();                                          
        var btnVal = $(this).attr("data-name");             
        //console.log(this)
        //console.log("button work");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + btnVal + "&api_key=oFpUhcOFQSCAb42LvCx2NxfC6IAcrk5o&limit=10";   //putting the url together
        // console.log(btnVal);

        $.ajax({                                                    //calling the ajax function to retrieve the api
            url: queryURL,                                          //the url being used
            method: "GET"                                           //the method being used

        }).then(function (response) {                               //then function to get a response from the api
            // console.log("hi")
            // console.log(response);
            var results = response.data;                            //puting the result data into a variable


            for (var a = 0; a < results.length; a++) {              //going through the data array

                // console.log("hello")
                var gifDiv = $("<div class='gifd'>");               //creating the div
                var rating = results[a].rating;                     //getting the rating

                var p = $("<p>").text("Rating: " + rating);         //putting the ratining in a p tag and variable

                var topicImage = $("<img>");                                                    // creating an image and putting into a variable
                topicImage.attr("src", results[a].images.fixed_height_still.url);               //putting the source of the image into the variable
                topicImage.attr("data-still", results[a].images.fixed_height_still.url);        //defining the data-still attribute
                topicImage.attr("data-animate", results[a].images.fixed_height.url);            //defining the data-animate attribute
                topicImage.attr("data-state", "still");                                         //defining the the data-state when loaded
                topicImage.attr("class", "gif img-fluid");                                      //giving the image a class and responsiveness through bootstrap
                // console.log(topicImage)
                gifDiv.append(p);                                   //putting the rating paragraph into the gif div
                gifDiv.prepend(topicImage);                         //prependding the image into the gif div variable

                $(".gifDiv").prepend(gifDiv);                       //putting that div into the html div

            } //end of the results for loop

        });//end of the .then method and function

    }); //end of a topic button click function

    $(document).on("click", ".gif", animateGif);                        //function that makes the gifs animate and pause

    function animateGif() {
        var state = $(this).attr("data-state");                         //puts the data value into the state variable
       // console.log(this)
        if (state == "still") {                                         //if the gif is still, this makes it move
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {                                                        //if the gif is moving this makes it still
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        } //end of else
    }//end of animate gif function

}); //end of document ready function