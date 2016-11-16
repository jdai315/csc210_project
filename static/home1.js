$(document).ready(function() {
    console.log("home page loaded");

    $('.email-item').click(function() {
        console.log("clicked");
	$('#main').css({visibility: "visible"});
        /* Not sure why these aren't working. It's something to do with jQuery, not CSS. */
        $('.email-item').removeClass("email-item-selected");
        $(this).addClass("email-item-selected");
        /*****/
        
        title = $(this).find('.email-subject').html();
        date = $(this).find('.email-date').html();
        content = $(this).find('.email-desc').html();
	author = $(this).find('.email-name').html();


	$('.email-content-title').html(title);
        $('.email-content-date').html(date);
        $('.email-content-body').html(content);
	$('.email-content-author').html(author);

    });
});

