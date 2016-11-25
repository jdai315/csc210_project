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


	$('.email-content-title').html(title);
        $('.email-content-date').html(date);
        $('.email-content-body').html(content);
	$('.email-content-author').html(author);

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
        return loadXMLDoc();
    }
                  
    //*** Editing story using ajax ***//
                  
    //var edit = document.getElementsByClassName("edit")[0]
                  
    $('.edit').click(function() {
        $body = $('.email-content-body').html();
                     $text = $("<textarea>", {name: "content", "class": "pure-input-1", rows: 12, cols: 67, contenteditable: "true"});
        $text.val($body);
        $('.email-content-body').html($text);
    })
    //<textarea id='' class='' name='notes' rows='12' cols='67' contenteditable='true' ></textarea>
    //<textarea name="content" id="content" class="pure-input-1" placeholder="Write here!"></textarea>
                     
                     
                  
                  
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

