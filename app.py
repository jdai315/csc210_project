from flask import Flask, render_template, request, redirect, flash, session
from functools import wraps
import data

app = Flask(__name__)
app.secret_key = "wow"

def authenticate(func):
    @wraps(func)
    def inner(*args):
        if 'user' not in session:
            return redirect("/")
        return func(*args)
    return inner

@app.route("/")
@app.route("/main")
def main():
    if 'user' in session:
        return private1()
    else:
        return render_template("main.html")

@app.route("/login", methods=["GET","POST"])
def login():
    if 'user' in session:
        return private1()
    if request.method == 'GET':
        return render_template("login.html")
    else:
        user_id = request.form["uname"]
        password = request.form["pw"]
        #check login, send to private page if successful
        if data.check(user_id, password):
            session['user'] = user_id
            return private1()
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
    if request.method == "GET":
        return render_template("register.html")
    else:
        user_id = request.form["uname"]
        password = request.form["pw"]
        #add new data to db, if taken dont do anything
        if data.addNew(user_id, password):
            flash("Successfully registered!")
            return redirect("/")
        else:
            flash("Sorry, the username is already taken.")
            return redirect("/register")


#store cookies
@app.route('/')
def index():
    resp = make_response(render_template('private1.html'))
    resp.set_cookie('user', user_id)
    return resp


#read cookies
@app.route('/')
def index():
    user_id = request.cookies.get('user_id')


@app.route("/private1")
#private pages
@authenticate
def private1():
    button = request.args.get("b",None)
    if button == None:
        return render_template("private1.html",user=session['user'])
    else:
        return private2()

@app.route("/public")
#public pages
def public():
    button = request.args.get("b", None)
    if button == 'home':
        return redirect("/main")
    else:
        return render_template("public.html")

#main
if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=5678)
