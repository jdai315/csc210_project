





function rateVotes{

var count = 0;
var uv = count + 1;
var dv = count - 1;

$('#upVote').click(function(){
	console.log("I have been pressed!");
	count++;
	
});


$('#dVote').click(function(){
	console.log("I have been pressed!");
	count--;
	
});

}

var counter = 0; //
var uv = counter + 1;
var dv = counter - 1;

func checkifVoted(){
return localStorage.getItem("voted");
}

if (!localStorage.getItem("voted")) {
  localStorage.setItem("voted", counter);
  $("#count").text(counter);
}
//Add 1 vote to the counter if the user presses upvote button, and only one user can add 1 at once
$("#upVote").click(function(){
var vote = checkIfUserVoted() != uv ? uv : counter;
  localStorage.setItem("voted", vote);
  $("#count").text(vote);
});

//Reduce vote by 1 if the user presses the downvote button
$("#dVote").click(function(){
var vote = checkIfUserVoted() != dv ? dv : counter;
  localStorage.setItem("voted", vote);
  $("#count").text(vote);
});

//Now we have to add these votes to the DB and then call them when necessary