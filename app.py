from flask import Flask, render_template, request, redirect, flash, session, make_response, jsonify
from functools import wraps
import data

app = Flask(__name__)
app.secret_key = "wow"

def authenticate(func):
    @wraps(func)
    def inner(*args, **kwargs):
        if 'user' not in session:
            return redirect("/")
        return func(*args, **kwargs)
    return inner

@app.route("/")
@app.route("/main")
def main():
    if 'user' in session:
        return home()
    button = request.args.get("b",None)
    if button == 'login':
        return login()
    elif button == 'regist':
        return register()
    else:
        return render_template("main.html")

@app.route("/login", methods=["GET","POST"])
def login():
    if request.method == 'GET':
        return render_template("login.html")
    else:
        user_id = request.form["uname"]
        password = request.form["pw"]
        #check login, send to private page if successful
        if data.checkUser(user_id, password):
            session['user'] = user_id
            return redirect("/home")
        else:
            flash("Invalid Username or Password!")
            return redirect("/login")

@app.route("/logout")
def logout():
    try:
        session.pop('user')
        flash("Successfully logged out")
    except Exception:
        pass
    return redirect("/")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/register", methods=["GET","POST"])
def register():
    if request.method == 'GET':
        return render_template("register.html")
    else:
        user_id = request.form["uname"]
        password = request.form["pw"]
        #add new data to db, if taken dont do anything
        if data.addUser(user_id, password):
            session['user'] = user_id
            return redirect("/home")
        else:
            flash("Sorry, the username is already taken.")
            return redirect("/register")



#set cookies
@app.route("/login")
def set_cookies():
    resp = make_response(render_template("home.html"))
    resp.set_cookie('user', user_id, expires=600000000)
    return resp

#read cookies
@app.route("/")
@app.route("/login")
def read_cookies():
    user_id = request.cookies.get('user')

#@app.route("/addstory", methods=["GET","POST"])
#private page only available to logged-in users
#@authenticate
#def addstory():
#    if request.method == 'GET':
#        return render_template("addstory.html", user=session['user'])    
#    else:
#        title = request.form["title"]
#        content = request.form["content"]
#
#        if not(title and not title.isspace()):
#            flash("Please add a title to your story")
#            return redirect("/addstory")
#        elif not(content and not content.isspace()):
#            flash("Story must have content!")
#            return redirect("/addstory")
#        elif data.addStory(title, content, session['user']):
#            flash("Story successfully added!")
#            return redirect("/home")
#        else:
#            flash("A story with this title already exists!")
#            return render_template("addstory.html",user=session['user'])

#Edit story based on the addstory, call on the existing item intact and change content
##@app.route("/addstory", methods=["GET","POST"])
##@authenticate
##def editStory():
##    if request.method == "GET":
##        return render_template("addstory.html", user=session['user'])
##    else:
##        title = request.form["title"]
##        content = request.form["content"]

##@app.route("/stories", methods=["GET","POST"])
##@authenticate
##def stories():
##    if request.method == 'GET':
##        return render_template("stories.html", user=session['user'])
##    else:
##        title = request.form["findTitle"]
##        content = data.getStory(title, session['user'])
##
##        if not(title and not title.isspace()):
##            flash("Please type a title to search for")
##            return redirect("/stories")
##        else:
##            flash("Search results")
##            return render_template("stories.html", user=session['user'], loadTitle=title, loadContent=content)


@app.route("/add", methods=["GET", "POST"])
def add():
    title = request.form["title"]
    content = request.form["content"]
    flash("You have added a story!")
    data.addStory(title, content, session['user'])
    return jsonify(title=title, content=content, user=session['user'])

@app.route("/home",  methods=["GET","POST"])
@authenticate
def home(): 
    if 'user' in session:
        contents = data.loadStories()
        return render_template("home.html", user=session['user'], contents=contents)
    else:
        return redirect("/")

@app.route("/profile",  methods=["GET","POST"])
@authenticate
def profile(): 
    if request.method =='GET':
        if 'user' in session:
            contents = data.getStories()
            return render_template("profile.html", user=session['user'], contents=contents)
        else:
            return redirect("/")
    else:
        old_pw = request.form['pw']
        new_pw = request.form['new_pw']
        new2_pw = request.form['new2_pw']
        user_id = session['user']
        if data.checkUser(user_id, old_pw):
            if(new_pw == new2_pw):
                data.updatePW(user_id, new_pw)
                flash("Password successfully updated!")
            else:
                flash("Your new password does not match! Please try again.")
        else:
            flash("Password incorrect!")
        return redirect("/profile")
        

@app.route("/story", methods=["GET","POST"])
@app.route("/story/<ID>", methods=["GET","POST"])
def story(ID):
    if 'user' in session:
        result = data.getStory(ID)
        contents = data.getStories()
        if request.method == 'GET':
            return render_template("story.html", user=session['user'],result=result, contents=contents)
        else:
            id = request.form["delete_id"]
            flash("You have deleted your edit!")
            return deleteStory(id)
    else:
        return redirect("/")

    
@app.route('/edit', methods=["GET", "POST"])
def edit():
    title = request.form["title"]
    content = request.form["content"]
    parentid = request.form["parentid"]
    data.addStory(title, content, session['user'], parentid)
    flash("You made an edit!")
    return jsonify(title=title, content=content, user=session['user'])

@app.route('/tree', methods=["GET", "POST"])
def tree():
    title = request.form["title"]
    result = data.loadTree(title)
    return jsonify(result=result, user=session['user'])

@app.route('/subTree', methods=["GET", "POST"])
def subTree():
    title = request.form["title"]
    ID = request.form["id"]
    result = data.loadSubTree(title,ID)
    return jsonify(result=result, user=session['user'])

@app.route("/rateStory", methods=["GET", "POST"])
def rateStory():
    up = request.form["up"]
    down = request.form["down"]
    ID = request.form["id"]
    data.rate(up, down, ID)
    return jsonify(up=up, down=down, ID=ID)

@app.route("/delete", methods=["GET", "POST"])
def deleteStory(id):
    data.deleteStory(session['user'], id)
    return redirect("/home")
 

if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=5678)
