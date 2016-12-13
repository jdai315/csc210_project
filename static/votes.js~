$(document).ready(function() {
    var editID = document.getElementsByClassName('email-content-id')[0].innerText;
    var up = editID + "up";
    var down = editID + "down";
    var vid = editID + "user";
    
    $("#upVote").text(localStorage.getItem(up));
    $("#dVote").text(localStorage.getItem(down));
    
    if(parseInt(localStorage.getItem(vid)) == 1){
	$(".button-success").css("background-color", "rgb(28, 184, 65)");
	$(".button-error").css("background-color",  "white");
    }
    if(parseInt(localStorage.getItem(vid)) == -1){
	$(".button-success").css("background-color", "white");
	$(".button-error").css("background-color", "rgb(202, 60, 60)");
    }
});
		 
document.getElementById("uv").addEventListener("click", function() {
    var editID = document.getElementsByClassName('email-content-id')[0].innerText;
    var up = editID + "up";
    var down = editID + "down";
    var vid = editID + "user";
    
    console.log("Up vote");
    console.log(up);

    if (parseInt(localStorage.getItem(vid)) == 1){
        console.log("vote cancelled");
	localStorage.setItem(vid, 0);
	localStorage.setItem(up, parseInt(localStorage.getItem(up))-1);
	$('#upVote').text(parseInt(localStorage.getItem(up)));
	$(".button-success").css("background-color", "white");
	$(".button-error").css("background-color", "white");
	vote();
        return false;     
    }
    else {	
	if (parseInt(localStorage.getItem(vid)) == -1){
            localStorage.setItem(down, parseInt(localStorage.getItem(down))-1);
            $("#dVote").text(parseInt(localStorage.getItem(down)));        
        }	
        localStorage.setItem(vid, 1);
	localStorage.setItem(up, parseInt(localStorage.getItem(up))+1);
        $("#upVote").text(parseInt(localStorage.getItem(up)));
	$(".button-success").css("background-color", "rgb(28, 184, 65)");
	$(".button-error").css("background-color",  "white");

    }
    vote(); // ajax call
});

document.getElementById("dv").addEventListener("click", function() {
    var editID = document.getElementsByClassName('email-content-id')[0].innerText;
    var up = editID + "up";
    var down = editID + "down";
    var vid = editID + "user";

    if (parseInt(localStorage.getItem(vid)) == -1){
	console.log("vote cancelled");
	localStorage.setItem(vid, 0);
	localStorage.setItem(down, parseInt(localStorage.getItem(down))-1);
	$('#dVote').text(parseInt(localStorage.getItem(down)));
	$(".button-success").css("background-color", "white");
	$(".button-error").css("background-color", "white");
	vote();
        return false;
    } else {	
	if (parseInt(localStorage.getItem(vid)) == 1){
            localStorage.setItem(up, parseInt(localStorage.getItem(up))-1);
            $("#uVote").text(parseInt(localStorage.getItem(up)));        
        }
	localStorage.setItem(vid, -1);
        localStorage.setItem(down, parseInt(localStorage.getItem(down))+1);     
        $("#dVote").text(parseInt(localStorage.getItem(down)));
        $(".button-success").css("background-color", "white");
	$(".button-error").css("background-color", "rgb(202, 60, 60)");

    }
    vote(); // ajax call
});
