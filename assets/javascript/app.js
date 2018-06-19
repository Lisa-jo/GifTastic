$(document).ready(function () {
    //declaring the global variables
    var topic = "";
    var newShow = "";
    var shows = ["Up", "Mulan", "Toy Story", "Monster's Inc", "Lion King", "Winnie the Pooh", "Snow White", "Cinderella", "Frozen", "Tangled", ];
    
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
    }); 

    function clearIt() {
        $(".gifDiv").html("");                              
    } 

    $(document).on("click", ".topicBtn", function () {      
        clearIt();                                          
        var btnVal = $(this).attr("data-name");             

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + btnVal + "&api_key=oFpUhcOFQSCAb42LvCx2NxfC6IAcrk5o&limit=10";  

        $.ajax({                                                   
            url: queryURL,                                         
            method: "GET"                                           

        }).then(function (response) {                              
        
            var results = response.data;                            


            for (var a = 0; a < results.length; a++) {           
                var gifDiv = $("<div class='gifd'>");              
                var rating = results[a].rating;                    

                var p = $("<p>").text("Rating: " + rating);      

                var topicImage = $("<img>");                                                   
                topicImage.attr("src", results[a].images.fixed_height_still.url);              
                topicImage.attr("data-still", results[a].images.fixed_height_still.url);       
                topicImage.attr("data-animate", results[a].images.fixed_height.url);           
                topicImage.attr("data-state", "still");                                     
                topicImage.attr("class", "gif img-fluid");              
                gifDiv.append(p);                                  
                gifDiv.prepend(topicImage);                    

                $(".gifDiv").prepend(gifDiv);                

            }

        });

    }); 

    $(document).on("click", ".gif", animateGif);            

    function animateGif() {
        var state = $(this).attr("data-state");                 
       
        if (state == "still") {                                        
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {                                                        
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        } 
    }

}); 