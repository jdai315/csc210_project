$(document).ready(function() {
    
    // Initialize localStorage variables:
    // up and down are binary variables that show whether a
    // user has up or down voted respectively.
    var editID = document.getElementsByClassName('email-content-id')[0].innerText;
    var up = editID + "up";
    var down = editID + "down";

    // Initialize icons on page load
    if(parseInt(localStorage.getItem(up)) == 1){
	$(".button-success").css("background-color", "rgb(28, 184, 65)"); //green
	$(".button-error").css("background-color",  "white");
    }
    if(parseInt(localStorage.getItem(down)) == 1){
	$(".button-success").css("background-color", "white");
	$(".button-error").css("background-color", "rgb(202, 60, 60)"); //red
    }
});



// Clicking the upvote icon...
document.getElementById("uv").addEventListener("click", function() {
    var editID = document.getElementsByClassName('email-content-id')[0].innerText;
    var up = editID + "up";
    var down = editID + "down";

    // if the user has already upvoted, cancel the previous upvote
    if (parseInt(localStorage.getItem(up)) == 1){
        //  set user's local upvote variable to 0
        console.log("vote cancelled");
        localStorage.setItem(up, 0);
        
        // then decrement total upvote value stored in #upVote
        var uptext = $("#upVote").text();
        console.log(uptext);
        uptext--;
        $("#upVote").text(uptext);
        
        // set icons to neutral white
        $(".button-success").css("background-color", "white");
	    $(".button-error").css("background-color", "white");
        
    } else {
        // else set user's local upvote variable to 1
        console.log("no upvotes yet");
        localStorage.setItem(up, 1);
        
        // then increment total upvote value stored in #upVote
        var uptext = $("#upVote").text();
        console.log(uptext);
        uptext++;
        $("#upVote").text(uptext);
        
        // set upvote icon to green
        $(".button-success").css("background-color", "rgb(28, 184, 65)"); //green
        
        // if user had previously downvoted, cancel that downvote
        if (parseInt(localStorage.getItem(down)) == 1){
            //  set user's local downvote variable to 0
            localStorage.setItem(down, 0);
            
            // then decrement total downvote value stored in #dVote
            var downtext = $("#dVote").text();
            downtext--;
            $("#dVote").text(downtext);
            
            // set downvote icon to neutral white
            $(".button-error").css("background-color",  "white");
        }
    }
    vote(); // ajax call sends the vote totals in #upVote and #dVote to SQLite
});



// Clicking the downvote icon (same behavior as with upvote icon) ...
document.getElementById("dv").addEventListener("click", function() {
	console.log("Down vote");
	var editID = document.getElementsByClassName('email-content-id')[0].innerText;
    var up = editID + "up";
    var down = editID + "down";

    // if the user has already downvoted, cancel the previous downvote
    if (parseInt(localStorage.getItem(down)) == 1){
    //  set user's local downvote variable to 0
        console.log("vote cancelled");
        localStorage.setItem(down, 0);
        
        // then decrement total downvote value stored in #dVote
        var downtext = $("#dVote").text();
        console.log(downtext);
        downtext--;
        $("#dVote").text(downtext);
        
        // set icons to neutral white
        $(".button-success").css("background-color", "white");
	    $(".button-error").css("background-color", "white");
        
    } else {
        // else set user's local downvote variable to 1
        console.log("no downvotes yet");
        localStorage.setItem(down, 1);
        
        // then increment total downvote value stored in #dVote
        var downtext = $("#dVote").text();
        downtext++;
        $("#dVote").text(downtext);
        
        // set downvote icon to red
        $(".button-error").css("background-color", "rgb(202, 60, 60)"); //red
        
        // if user had previously upvoted, cancel that upvote
        if (parseInt(localStorage.getItem(up)) == 1){
            //  set user's local upvote variable to 0
            localStorage.setItem(up, 0);
            
            // then decrement total upvote value stored in #upVote
            var uptext = $("#upVote").text();
            uptext--;
            $("#upVote").text(uptext);
            
            // set upvote icon to neutral white
            $(".button-success").css("background-color", "white");
        }
    }
    vote(); // ajax call sends the vote totals in #upVote and #dVote to SQLite
});
