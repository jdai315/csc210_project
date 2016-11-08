
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
                                         title = $(this).find('.email-subject').html();
                                         content = $(this).find('.email-desc').html();
                                         
                                         $('.email-content-title').html(title);
                                         $('.email-content-body').html(content);
                                         });
});

