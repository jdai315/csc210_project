$(document).ready(function() {
    console.log("home page loaded");

    // this following code is specific only to the /profile page //
    var url = "http://localhost:5678/profile";

    console.log(location.href);
    
    if(location.href==url){
	$('#main').css({visibility: "visible"});
	if($('.filter_mine').length === 0){
	    $('#list').append("<div id='no_stories' class='pure-g'><div id='none' class='pure-u-3-4'>You do not have any stories!<p>Get started by clicking the<br />'Add New Story' button to the left.</p></div></div>");
	    $('.filter_others').parent().parent().css({display: "none"});
	    $('.pure-menu-link').removeClass("filter_selected");
	}

    }

    $('#story_counter').html(
	$('.email-item').length
    );
    
    //*** Displaying story content ***//

    if(location.href!=url){
	$('.email-item').click(function() {
            console.log("clicked");
            $('#main').css({visibility: "visible"});
            $('.email-item').removeClass("email-item-selected");
            $(this).addClass("email-item-selected");
            
            title = $(this).find('.email-subject').html();
            date = $(this).find('.email-date').html();
            content = $(this).find('.email-desc').html();
            author = $(this).find('.email-name').html();
            id = $(this).find('.email-id').html();
	    
            $('.email-content-title').html(title);
            $('.email-content-date').html(date);
            $('.email-content-body').html(content);
            $('.email-content-author').html(author);
            $('.email-content-id').html(id);
	    
	});
    }
                  
    //*** Adding story using ajax ***//
                  
    var modal = document.getElementById('addStory');
    var btn = document.getElementById("modalBtn");
    var close = document.getElementsByClassName("close")[0];
    var submit = document.getElementById("submit");
                  
    btn.onclick = function() {
        modal.style.display = "block";
    }
                  
    close.onclick = function() {
        modal.style.display = "none";
    }
                  
    submit.onclick = function() {
        modal.style.display = "none";
        console.log("home1.js triggered");
        return addStory();
                  
    }
                  
    //*** Editing story using ajax ***//
       
    $('.edit').click(function() {
        $('.email-content-body').attr("contenteditable", "true");
        $(this).css({display: "none"});
        $('.delete').css({display: "none"});
        $('.submitbranch').css({display: "inline"});
        $('.cancel').css({display: "inline"});
    })
                  
    $('.cancel, .email-item').click(function() {
        $('.email-content-body').attr("contenteditable", "false");
        $('.cancel').css({display: "none"});
        $('.delete').css({display: "inline"});
        $('.submitbranch').css({display: "none"});
        $('.edit').css({display: "inline"});
    })

    $('.submitbranch').click(function() {
        return addEdit();
        $('#main').css({visibility: "hidden"});
    })

    //*** Drawing tree ***//
    

/*
    var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');
    canvas.style.backgroundColor = 'rgba(158, 167, 184, 0.2)';
    fitToContainer(canvas);
    var x = canvas.width/2;
    var y = 50;
    ctx.beginPath();
    

    
    var myImage = new Image();
    myImage.src = 'static/img/icons/doc.png';
    myImage.onload = function(){ctx.drawImage(myImage,x-25,y-25,50,50);}
    ctx.moveTo(x,y);

    ctx.lineTo(startX,300);
    //ctx.strokeStyle="red";
    ctx.stroke();

    function fitToContainer(canvas){
        canvas.style.width='100%';
        canvas.style.height='100%';
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
        
        */
        
        
    var MAP_WIDTH  = 620;
    var MAP_HEIGHT = 600;

    var mapContainer = document.getElementById("raphael");
    var map = new Raphael(mapContainer, MAP_WIDTH, MAP_HEIGHT);
    
    var style = {
        stroke: "#aaa",
        "stroke-width": 2,
        "stroke-linejoin": "round",
        cursor: "pointer"
        };

map
  .path("m 300,150 30,50 -80,90 12,5 z")
  .attr(style);
        
    //*** Filtering stories ***//

    var filter_all = document.getElementById("all");
    var filter_mine = document.getElementById("mine");
    var filter_others = document.getElementById("others");

    filter_all.onclick = function() {
	$('#no_stories').remove();
	$('.filter_mine').parent().parent().css({display: "block"});
	$('.filter_others').parent().parent().css({display: "block"});
	$('.pure-menu-link').removeClass("filter_selected");
	$(this).addClass("filter_selected");
    }

    filter_mine.onclick = function() {
	if($('.filter_mine').length === 0){
	    $('#list').append("<div id='no_stories' class='pure-g'><div id='none' class='pure-u-3-4'>You do not have any stories!<p>Get started by clicking the<br />'Add New Story' button to the left.</p></div></div>");
	    $('.filter_others').parent().parent().css({display: "none"});
	    $('.pure-menu-link').removeClass("filter_selected");
	}
	else{
	    $('#no_stories').remove();
	    $('.filter_mine').parent().parent().css({display: "block"});
	    $('.filter_others').parent().parent().css({display: "none"});
	    $('.pure-menu-link').removeClass("filter_selected");
	    $(this).addClass("filter_selected");
	}
    }

    filter_others.onclick = function() {
	$('#no_stories').remove();
	$('.filter_mine').parent().parent().css({display: "none"});
	$('.filter_others').parent().parent().css({display: "block"});
	$('.pure-menu-link').removeClass("filter_selected");
	$(this).addClass("filter_selected");
    }
            
});

