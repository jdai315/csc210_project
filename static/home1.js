$(document).ready(function() {
    console.log("home page loaded");
                  
                  
    //*** Displaying story content ***//

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
                  
                  
    //*** Filtering stories ***//

    var filter_all = document.getElementById("all");
    var filter_mine = document.getElementById("mine");
    var filter_others = document.getElementById("others");

    filter_all.onclick = function() {
	$('.filter_mine').parent().parent().css({display: "block"});
	$('.filter_others').parent().parent().css({display: "block"});
	$('.pure-menu-link').removeClass("filter_selected");
	$(this).addClass("filter_selected");
    }

    filter_mine.onclick = function() {
	$('.filter_mine').parent().parent().css({display: "block"});
	$('.filter_others').parent().parent().css({display: "none"});
	$('.pure-menu-link').removeClass("filter_selected");
	$(this).addClass("filter_selected");
    }

    filter_others.onclick = function() {
	$('.filter_mine').parent().parent().css({display: "none"});
	$('.filter_others').parent().parent().css({display: "block"});
	$('.pure-menu-link').removeClass("filter_selected");
	$(this).addClass("filter_selected");
    }

    
});

