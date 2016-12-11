function addStory()
{
    console.log("entering ajax.js");
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
                console.log("working!")
                var response = JSON.parse(req.responseText)
                // create a new div element
                // and give it some content
                
                var newDiv = document.createElement("div")
                newDiv.className += "email-item pure-g"
                
                var childDiv = document.createElement("div")
                childDiv.className += "pure-u-3-5"
                
                var span1 = document.createElement("span")
                span1.className += "email-label-mine"
                
                var h5 = document.createElement("h5")
                h5.className += "email-name"
                
                var h4 = document.createElement("h4")
                h4.className += "email-subject"
                
                var pdate = document.createElement("p")
                pdate.className += "email-date"

		var spandate = document.createElement("span")
		spandate.className += "small_date"
		
                var span2 = document.createElement("span")
                
                var pdesc = document.createElement("p")
                pdesc.style.wordwrap = "break-word"
                pdesc.className += "email-desc cut-off"

		var divid = document.createElement("div")
		divid.className += "pure-u-2-5 shrink"
     
                var newTitle = document.createTextNode(response.title)
                var newContent = document.createTextNode(response.content)
                var name = document.createTextNode(response.user)
		var date = document.createTextNode("Created just now")
		var id = document.createTextNode("NEW")
                
                pdesc.appendChild(newContent)
                h4.appendChild(newTitle)
                h5.appendChild(name)
		spandate.appendChild(date)
		
		pdate.appendChild(spandate)
                
                childDiv.appendChild(pdesc)
                childDiv.insertBefore(pdate, pdesc)
                childDiv.insertBefore(h4, pdate)
                childDiv.insertBefore(h5, h4)
                childDiv.insertBefore(span1, h5)
                newDiv.appendChild(childDiv) //add the text node to the newly created div.
		
                // add the newly created element and its content into the DOM
                var currentDiv = document.getElementById("ajaxposts")
                
                var list = document.getElementById("list")
                list.insertBefore(newDiv, currentDiv)
                
                //$( "#ajaxposts" ).before( newDiv )
                $('#no_stories').css({display: "hidden"})
                
            }
        }
    }
    
    req.open('POST', '/add')
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    var tit = document.getElementById('title').value
    var con = document.getElementById('content').value
    var postVars = 'title='+tit+'&content='+con
    req.send(postVars)
    
    return false
}


function addEdit()
{
    console.log("ajax.js add edit function")
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
                console.log("Edit success")
		window.location.replace("http://localhost:5678/home")
            }
        }
    }
    
    console.log("test")
    req.open('POST', '/edit')
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    var tit = document.getElementsByClassName('email-content-title')[0].innerText
    var con = document.getElementsByClassName('email-content-body')[0].innerText
    var parentid = document.getElementsByClassName('email-content-id')[0].innerText
    var postVars = 'title='+tit+'&content='+con+'&parentid='+parentid
    req.send(postVars)
    return false
}


function vote()
{
    console.log("ajax.js add edit function")
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
                console.log("Edit success")
            }
        }
    }
    
    console.log("test")
    req.open('POST', '/rateStory')
    console.log
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    var up = document.getElementById('upVote').innerText
    console.log("up count: " + up)
    var down = document.getElementById('dVote').innerText
    var id = document.getElementsByClassName('email-content-id')[0].innerText
    var postVars = 'up='+up+'&down='+down+'&id='+id
    req.send(postVars)
    
    return false
}




