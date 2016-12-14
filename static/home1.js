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
                            var img = 70;
                            var p = Raphael("raphael");
                            p.setViewBox(0, 0, w, h, true);
                            p.canvas.setAttribute('preserveAspectRatio', 'none');
                            var x = w / 2;
                            var y = 100;
                           
                            console.log(x);
                            console.log(y);
                           
                            var start, path = "M " + x + " " + y; // this is the (absolute) starting position of the path
                            var style = {
                                stroke: "#7B7B7A",
                                "stroke-width": 4,
                                "stroke-linejoin": "round"
                            };
                           
                            // printNode() takes the ID of a node, determines the node's children,  prints an icon-node that links to that node's content, and draws stems to the children. Function called recursively to generate tree.
                           
                            function printNode(ID) {
                                var childArray = new Array(); // store all children of node with ID into childArray[]
                                var thisNode; // "this"
                                for (i=0; i< nodes.length;i++){ // finding all children whose parentID == ID
                                    if (nodes[i][5] == ID){
                                        childArray.push(nodes[i]);
                                        //console.log(ID);
                                    }
                                    else if (nodes[i][0] == ID){
                                        thisNode = nodes[i];
                                    }
                                }
                                var numChildren = childArray.length;
                                console.log("Number of children: " + numChildren);

                                var url = "/story/" + ID; // this is the url that will link to the edit's unique webpage
    
                                // printing the icon and associated up/down votes
                                p.image("/static/img/icons/doc3.png", x-(img/2), y-(img/2), img, img)
                                .hover(
                                    function(){
                                        this.attr({src: "/static/img/icons/doc3_hovered.png"});
                                    },
                                    function(){
                                        this.attr({src: "/static/img/icons/doc3.png"});
                                    })
                                .attr({cursor: "pointer", href: url});
                           
                                var upVote = thisNode[6];
                                var downVote = thisNode[7];
                                p.text(x-(img/2.5), y+(img/2.5), upVote).attr({"font-size": 30, "font-weight": "bold", fill: "#02820B"});
                                p.text(x+(img/2.5), y+(img/2.5), downVote).attr({"font-size": 30, "font-weight": "bold", fill: "#B71306"});
                                console.log("Printed icon"); // finish printing icon
    
                                // if thisNode only has one child, draw a straight line downward to the child node
                                if (numChildren == 1){
                                    y += 100;
                                    console.log("X: " + x);
                                    console.log("Y: " + y);
                                    path += " L " + x + " " + y;
                                    //path += " l 0 200";
                                    
                                    printNode(childArray[0][0]);
                                    y -= 100;
                                    console.log("X: " + x);
                                    console.log("Y: " + y);
                                    path += " M " + x + " " + y;
                                }

                                // if thisNode has multiple children, draw lines at 45-degrees in both directions downward, and if numChildren > 2, spaced equally inward from these outer lines
                                else if (numChildren > 1){
                                    for (i=0; i < numChildren;i++){
                                        var newI = i;
                                        var newNum = numChildren;
                                        var angle = (((newI / (newNum-1))*200)-100);
                                        x += angle;
                                        y += 100;
                                        path += " L " + x + " " + y;
                                        console.log("X: " + x);
                                        console.log("Y: " + y);
                                        console.log(childArray);
        
                                        printNode(childArray[i][0]);
                                        x -= angle;
                                        y -= 100;
                                        path += " M " + x + " " + y;
                                        console.log("X: " + x);
                                        console.log("Y: " + y);
                                        i = newI;
                                    }
                                }
                           
                                else if (numChildren == 0){
                                    console.log("No children");
                                    return;
                                }
                                console.log("Number of children: " + numChildren);
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

$(document).ready(function() {
    console.log("home page loaded");

    // this following code is specific only to the /profile page //
    var url = "http://localhost:5678/profile";
    var url2 = "http://localhost:5678/story";
    var url3 = "http://localhost:5678/home";

    //profile page: link to each story through click
    $(document).on('click', '.direct-link', function() {
	var id = $(this).find('.email-id').html();
	var url = "http://localhost:5678/story/" + id;
	window.location.assign(url);
    });

    //show profile info on profile page
    if(location.href==url){
	$('#main').css({visibility: "visible"});
	if($('.filter_mine').length === 0){
	    $('#no_stories').css({display: "block"});
	    $('.filter_others').parent().parent().css({display: "none"});
	    $('.pure-menu-link').removeClass("filter_selected");
	}
    }
    
    //make sure that content in story.html is visible
    else if(location.href.indexOf("story") != -1){
	$('#main').css({visibility: "visible"});

    }
    
    //*** Displaying story content ***//

    if(location.href!=url){
	
	$(document).on('click', '.email-item', function(){
	    $('email-item').attr("selected", "selected");
        console.log("clicked");
        $('#main').css({visibility: "visible"});
        $('.email-item').removeClass("email-item-selected");
        $(this).addClass("email-item-selected");
            
        title = $(this).find('.email-subject').html();
        date = $(this).find('.email-date').html();
        author = $(this).find('.email-name').html();
	    localStorage.setItem('root',$(this).find('.email-subject').html());
	    
        $('.email-content-title').html(title);
        $('.email-content-date').html(date);
        $('.email-content-author').html(author);
        //display the selected content even after leaving the page
        if(location.href.indexOf("story") == -1){loadTree();} // call Ajax
	});

	$(document).ready(function() {
	    if(location.href.indexOf('home') != -1){
		var redirect_title = localStorage.getItem('root');
		console.log(redirect_title);
		
		if(redirect_title!=null){
		    console.log("trying to load previous tree");
		    var findTitle = $.trim(redirect_title);
		    var correctItem;
		    //find the root story by title
		    $('.email-subject').each(function() {
			if($.trim($(this).html())==findTitle){
			    correctItem = $(this);
			}
		    });
		    var parentItem = correctItem.parent().parent()
		    parentItem.click();
		}
		
		else{
		    console.log("no previous story recorded");
		}
	    }
	});
        
    }
    
    //*** Adding story using Ajax ***//
    
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
        //document.getElementById("submit").submit();
        return addStory(); // call Ajax

        
    }
    
    
    //*** Editing story using ajax ***//

    var original_text = $('.email-content-body').text();

    $('#del_button').click(function() {
	var editID = document.getElementsByClassName('email-content-id')[0].innerText;
	var up = editID + "up";
	var down = editID + "down";
	var vid = editID + "user";

	console.log("del check")
	localStorage.setItem(up, 0);
	localStorage.setItem(down, 0);
	localStorage.setItem(vid, 0);
	console.log(localStorage.getItem(up));
	console.log(localStorage.getItem(down));
	console.log(localStorage.getItem(vid));
	
    });
			   
    $('.edit').click(function() {
        $('.email-content-body').attr("contenteditable", "true");
	$('.email-content-body').css({color: "blue"});
        $(this).css({display: "none"});
        $('.delete').css({display: "none"});
        $('.submitbranch').css({display: "inline"});
        $('.cancel').css({display: "inline"});
	$('#vote_div').css({display: "none"});
    });
    
    $('.cancel, .email-item').click(function() {
	$('.email-content-body').text(original_text);
        $('.email-content-body').attr("contenteditable", "false");
	$('.email-content-body').css({color: "black"});
        $('.cancel').css({display: "none"});
        $('.delete').css({display: "inline"});
        $('.submitbranch').css({display: "none"});
        $('.edit').css({display: "inline"});
	$('#vote_div').css({display: "inline"});
    });

    $('.submitbranch').click(function() {
        $('.email-content-body').attr("contenteditable", "false");
        return addEdit();
    })

    //*** Going back to root story ***//
    
    $('#back-icon').click(function() {
	var rootid = $(".email-content-title").html();
	console.log("back to root");
	localStorage.setItem('root', rootid); 
    });
    
    //*** Filtering stories ***//

    var filter_all = document.getElementById("all");
    var filter_mine = document.getElementById("mine");
    var filter_others = document.getElementById("others");

    if(filter_all != null){
	filter_all.onclick = function() {
	    $('#no_stories').css({display: "none"});
	    $('.filter_mine').parent().parent().css({display: "block"});
	    $('.filter_others').parent().parent().css({display: "block"});
	    $('.pure-menu-link').removeClass("filter_selected");
	    $(this).addClass("filter_selected");
	}
    }

    if(filter_mine != null){
	filter_mine.onclick = function() {
	    if($('.filter_mine').length === 0){
		$('#no_stories').css({display: "block"});
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
    }

    if(filter_others != null){
	filter_others.onclick = function() {
	    $('#no_stories').css({display: "none"});
	    $('.filter_mine').parent().parent().css({display: "none"});
	    $('.filter_others').parent().parent().css({display: "block"});
	    $('.pure-menu-link').removeClass("filter_selected");
	    $(this).addClass("filter_selected");
	}
    }
    
});

