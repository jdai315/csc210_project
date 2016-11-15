var modal = document.getElementById('addStory');

var btn = document.getElementById("modalBtn");

var span = document.getElementsByClassName('close')[0];

btn.onclick = function() {
    modal.style.display = "block";
    console.log("test");
}

span.onclick = function() {
    modal.style.display = "none";
}