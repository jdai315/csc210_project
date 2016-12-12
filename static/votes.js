$(document).ready(function() {
    var editID = document.getElementsByClassName('email-content-id')[0].innerText;
    var up = editID + "up";
    var down = editID + "down";
    if(parseInt(localStorage.getItem(up)) == 1){
	$(".button-success").css("background-color", "rgb(28, 184, 65)");
	$(".button-error").css("background-color",  "white");
    }
    if(parseInt(localStorage.getItem(down)) == 1){
	$(".button-success").css("background-color", "white");
	$(".button-error").css("background-color", "rgb(202, 60, 60)");
    }
});
		 
document.getElementById("uv").addEventListener("click", function() {
    var editID = document.getElementsByClassName('email-content-id')[0].innerText;
    var up = editID + "up";
    var down = editID + "down";
    console.log("Up vote");
    console.log(up);

    if (parseInt(localStorage.getItem(up)) == 1){
        console.log("vote cancelled");
	localStorage.setItem(down, 0);
	localStorage.setItem(up, 0);
	$('#upVote').text(0);
	$('#dVote').text(0);
	$(".button-success").css("background-color", "white");
	$(".button-error").css("background-color", "white");
	vote();
        return false;
        
    } else {
        localStorage.setItem(up, 1);
        $("#upVote").text(1);
	$(".button-success").css("background-color", "rgb(28, 184, 65)");
	$(".button-error").css("background-color",  "white");

	if (parseInt(localStorage.getItem(down)) == 1){
            localStorage.setItem(down, 0);
            $("#dVote").text(0);        
        }
    }
    vote(); // ajax call
});

document.getElementById("dv").addEventListener("click", function() {
    var editID = document.getElementsByClassName('email-content-id')[0].innerText;
    var up = editID + "up";
    var down = editID + "down";

    if (parseInt(localStorage.getItem(down)) == 1){
	console.log("vote cancelled");
	localStorage.setItem(down, 0);
	localStorage.setItem(up, 0);
	$('#upVote').text(0);
	$('#dVote').text(0);
	$(".button-success").css("background-color", "white");
	$(".button-error").css("background-color", "white");
	vote();
        return false;
    } else {
	
        localStorage.setItem(down, 1);      
        $("#dVote").text(1);
        $(".button-success").css("background-color", "white");
	$(".button-error").css("background-color", "rgb(202, 60, 60)");
        
        if (parseInt(localStorage.getItem(up)) == 1){
            localStorage.setItem(up, 0);
            $("#upVote").text(0);	   

        }
    }
    vote(); // ajax call
});
