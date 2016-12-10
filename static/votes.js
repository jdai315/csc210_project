//$(document).ready(function() {


document.getElementById("uv").addEventListener("click", function() {
    var editID = document.getElementsByClassName('email-content-id')[0].innerText;
    var up = editID + "up";
    var down = editID + "down";
	console.log("Up vote");
	console.log(up);

    if (parseInt(localStorage.getItem(up)) == 1){
        console.log("already 1 upvote!");
        return false;
        
    } else {
        console.log("no upvotes yet!");
    
        localStorage.setItem(up, 1);
        
        var uptext = $("#upVote").text();
        console.log(uptext);
        uptext++;
        //console.log(uptext);
        $("#upVote").text(uptext);
        
        
        if (parseInt(localStorage.getItem(down)) == 1){
            localStorage.setItem(down, 0);
            
            var downtext = $("#dVote").text();
            downtext--;
            $("#dVote").text(downtext);
            
        }
    }
    vote(); // ajax call
});

document.getElementById("dv").addEventListener("click", function() {
	console.log("Down vote");
	var editID = document.getElementsByClassName('email-content-id')[0].innerText;
    var up = editID + "up";
    var down = editID + "down";

    if (parseInt(localStorage.getItem(down)) == 1){
        return false;
    } else {
        localStorage.setItem(down, 1);
        
        var downtext = $("#dVote").text();
        downtext++;
        $("#dVote").text(downtext);
        
        if (parseInt(localStorage.getItem(up)) == 1){
            localStorage.setItem(up, 0);
            
            var uptext = $("#upVote").text();
            uptext--;
            $("#upVote").text(uptext);
            
        }
    }
    vote(); // ajax call
});
