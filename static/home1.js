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
            //content = $(this).find('.email-desc').html();
            author = $(this).find('.email-name').html();
            //id = $(this).find('.email-id').html();
	    
            $('.email-content-title').html(title);
            $('.email-content-date').html(date);
            //$('.email-content-body').html(content);
            $('.email-content-author').html(author);
            //$('.email-content-id').html(id);
            
  
            function loadTree()
            {
                var req = new XMLHttpRequest()
                req.onreadystatechange = function()
                {
                    if (req.readyState == 4)
                    {
                        if (req.status != 200)
                        {
                            console.log("error")
                        }
                        else
                        {
                            console.log("success")
                            var response = JSON.parse(req.responseText);
                            var nodes = response.result;
                            console.log(nodes);
                           
                            // ON SUCCESS, RENDER TREE DIAGRAM WITH RAPHAEL.JS USING JSON DATA:
                            // Documentation: https://dmitrybaranovskiy.github.io/raphael/reference.html
    
                            // Find the root node
                            var numNodes = nodes.length;
                            var root;
                            for (i=0; i< nodes.length;i++){
                                if (nodes[i][5] == null){
                                    root = nodes[i];
                                }
                            }
                            var ID = root[0];

                            // initializing the Raphael canvas:
                            document.getElementById("raphael").innerHTML = ""; // wipe clean previous grid if any
                            var w = 800;
                            var h = 600;
                            var img = 100;
                            var p = Raphael("raphael");
                            p.setViewBox(0, 0, w, h, true);
                            p.canvas.setAttribute('preserveAspectRatio', 'none');
                            var x = w / 2;
                            var y = 100;
                            var start, path = "M " + x + " " + y; // starting position of path
                            var style = {
                                stroke: "#7B7B7A",
                                "stroke-width": 4,
                                "stroke-linejoin": "round"
                            };
                           
                            // printNode() takes the ID of a node, determines the node's children,  prints an icon-node that links to that node's content, and draws stems to the children. Function called recursively to generate tree.
                            function printNode(ID) {
                                var childArray = new Array();
                                for (i=0; i< nodes.length;i++){ // finding all children whose parentID == ID
                                    if (nodes[i][5] == ID){
                                        childArray.push(nodes[i]);
                                        console.log(ID);
                                    }
                                }
                                var numChildren = childArray.length;
                                console.log(numChildren);

                                var url = "/story/" + ID;
    
                                p.image("/static/img/icons/doc.png", x-(img/2), y-(img/2), img, img)
                                .hover(function(){this.attr({src: "/static/img/icons/doc_hovered.png"});}, function(){this.attr({src: "/static/img/icons/doc.png"});}).attr({cursor: "pointer", href: url});
                           
                           
                                console.log("Printed icon");
    
                                if (numChildren == 1){
                                    y += 200;
                                    console.log(x);
                                    console.log(y);
                                    path += " L " + x + " " + y;
                                    //path += " l 0 200";
    
                                    printNode(childArray[0][0]);
                                    y -= 200;
                                    console.log(x);
                                    console.log(y);
                                    path += " M " + x + " " + y;
                                }

                                else if (numChildren > 1){
                                    for (i=0; i< numChildren;i++){
                                        var angle = ((((numChildren-1) / i)*400)-200);
                                        x += angle;
                                        y += 200;
                                        path += " L " + x + " " + y;
                                        console.log(x);
                                        console.log(y);
        
                                        printNode(childArray[i][0]);
                                        x -= angle;
                                        y -= 200;
                                        path += " M " + x + " " + y;
                                        console.log(x);
                                        console.log(y);
                                    }
                                }
                           
                                else if (numChildren == 0){
                                    return;
                           
                                }
                            }

                            printNode(ID);
                            console.log(path);
                            p.path(path).attr(style);
                            // DONE RENDERING TREE
                        }
                    }
                }
    
                req.open('POST', '/tree')
                req.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
                var tit = document.getElementsByClassName('email-content-title')[0].innerText
                var postVars = 'title='+tit
                req.send(postVars)
                return false
            }

            loadTree(); // call Ajax
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
    })


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

