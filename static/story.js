
$(document).ready(function() {
    console.log("home page loaded");
                  
                  $('.email-item').mouseenter(function() {
                                         $(this).css("background-color", "#F2F2F2");
                                         });
                  
                  $('.email-item').mouseleave(function() {
                                              $(this).css("background-color", "white");
                                              });
                  
                  $('.email-item').click(function() {
                                         console.log("clicked");

                                         /* Not sure why these aren't working. It's something to do with jQuery, not CSS. */
                                         $('.email-item').not(this).removeClass("email-item-selected");
                                         $(this).addClass("email-item-selected");
                                         /*****/
                                         
                                         title = $(this).find('.email-subject').html();
                                         date = $(this).find('.email-date').html();
                                         content = $(this).find('.email-desc').html();
                                         
                                         
                                         $('.email-content-title').html(title);
                                         $('.email-content-date').html(date);
                                         $('.email-content-body').html(content);
                                         });
});

