var modal = document.getElementById('addStory');

var btn = document.getElementById("modalBtn");

var close = document.getElementsByClassName("close")[0];
var submit = document.getElementById("submit");

btn.onclick = function() {
    modal.style.display = "block";
    console.log("test");
}

close.onclick = function() {
    console.log("this is working");
    modal.style.display = "none";
}

submit.onclick = function() {
    console.log("this is working");
    modal.style.display = "none";
    return loadXMLDoc();
}