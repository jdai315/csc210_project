import sqlite3
import datetime, time

def adapt_datetime(ts):
    return time.mktime(ts.timetuple())

#add new uname/pw to database
def addUser(username, password):

    #connect to the database 'userpw'
    conn = sqlite3.connect("database")
    c = conn.cursor()

    #create a table if it doesn't exist where usernames are in 'name' and passwords are in 'pw'
    c.execute('CREATE TABLE IF NOT EXISTS users(name varchar(24) primary key, pw varchar(24), UNIQUE(name, pw))')

    #this is where the cursor checks if the username already exists
    c.execute('SELECT pw from users where name= ?',(username,))
    exist = c.fetchone()

    #if it isnt already in the table, insert it
    if exist is None:
        c.execute('INSERT OR IGNORE INTO users(name, pw) VALUES(?,?)', (username, password))
        conn.commit()
        conn.close()
        return True

    #otherwise, return false to tell app.py that registering failed
    else:
        conn.commit()
        conn.close()
        return False

#check if user/pw matches
def checkUser(username, password):

    #connect to the database 'userpw'
    conn = sqlite3.connect("database")
    c = conn.cursor()

    #fetch the correct password associated with this username
    c.execute('SELECT pw from users WHERE name= ?',(username,))
    exist = c.fetchone()

    #if user doesnt exist, test fails. if password isnt the same as the stored password, test fails. otherwise, the test passes.
    if exist is None:
        conn.close()
        return False
    else:
        print exist
        conn.close()
        #this converts the database value into a string
        return password == exist[0].encode("ascii")

#update user password
def updatePW(username, new_password):

     #connect to the database 'userpw'
    conn = sqlite3.connect("database")
    c = conn.cursor()

    #update to the new password associated with this username
    c.execute('UPDATE users SET pw= ? WHERE name= ?',(new_password,username))
    exist = c.fetchone()

    conn.commit()
    conn.close()
    return True


#add a new story (if the story is a root, parentid=None)
def addStory(title, content, user, parentid=None):
    
    #connect to 'database'
    conn = sqlite3.connect("database")
    c = conn.cursor()
    now = datetime.datetime.now().strftime("%B %d, %Y - %I:%M %p")
    initialup = 0
    initialdown = 0
    
    #create a table if it doesn't exist
    # (drop the table if you need to start from scratch)
    #c.execute('DROP TABLE stories')
    c.execute('CREATE TABLE IF NOT EXISTS stories(id integer primary key, title varchar(24), content varchar(100), date text, user varchar(24), parentid integer, upvotes integer, downvotes integer, FOREIGN KEY(user) REFERENCES users(name))')

    #this is where the cursor checks if the story already exists
    c.execute('SELECT content FROM stories WHERE title= ? AND content= ? AND user= ? AND parentid= ?',(title, content, user, parentid))
    exist = c.fetchone()

    #if it isnt already in the table, insert it
    if exist is None:
        c.execute('INSERT OR IGNORE INTO stories(title, content, date, user, parentid, upvotes, downvotes) VALUES(?,?,?,?,?,?,?)', (title, content, now, user, parentid, initialup, initialdown))
        conn.commit()
        conn.close()
        return True

    else:
        conn.commit()
        conn.close()
        return False

#delete a story with no children
def deleteStory(user, id):

    #connect to 'database'
    conn = sqlite3.connect("database")
    c = conn.cursor()

    #create a table if it doesn't exist
    # (drop the table if you need to start from scratch)
    #c.execute('DROP TABLE stories')
    c.execute('CREATE TABLE IF NOT EXISTS stories(id integer primary key, title varchar(24), content varchar(100), date text, user varchar(24), parentid integer, upvotes integer, downvotes integer, FOREIGN KEY(user) REFERENCES users(name))')

    #this is where the cursor checks if the story already exists
    c.execute('SELECT * FROM stories WHERE id= ? AND user= ?',(id, user))
    exist = c.fetchone()

    #if it doesn't exist, do nothing
    if exist is None:
        print "cannot delete someone elses story"
        conn.commit()
        conn.close()
        return False

    #if it does exist, check if it has any children
    else:
        #this is where the cursor checks if the story already exists
        c.execute('SELECT * FROM stories WHERE parentid= ?',(id,))
        ex = c.fetchone()

        #if there are no children of this parent story, delete it
        if ex is None:
            c.execute('DELETE FROM stories WHERE id= ?',(id,))
            print "story " + id + " successfully deleted"
            conn.commit()
            conn.close()
            return True
        else:
            print "can't delete: this story has children"
            conn.commit()
            conn.close()
            return False

#retreive all stories
def getStories():

    conn = sqlite3.connect("database")
    c = conn.cursor()

    c.execute('CREATE TABLE IF NOT EXISTS stories(id integer primary key, title varchar(24), content varchar(100), date text, user varchar(24), parentid integer, upvotes integer, downvotes integer, FOREIGN KEY(user) REFERENCES users(name))')
    c.execute('SELECT * FROM stories')

    #reverse the order of the stories to show most recent at the top
    ex = c.fetchall()
    exist = ex[::-1]
    
    if exist is None:
        conn.commit()
        conn.close()
        print "there are no stories"
        return null
    
    else:
        conn.commit()
        conn.close()
        return exist

#retreive stories for home feed (root stories only)
def loadStories():
    
    conn = sqlite3.connect("database")
    c = conn.cursor()
    val = "None"
    c.execute('CREATE TABLE IF NOT EXISTS stories(id integer primary key, title varchar(24), content varchar(100), date text, user varchar(24), parentid integer, upvotes integer, downvotes integer, FOREIGN KEY(user) REFERENCES users(name))')
    c.execute('SELECT id, title, date, user FROM stories WHERE parentID is null') # fetch only root stories (those without a parent) 

    #reverse the order of the stories to show most recent at the top
    ex = c.fetchall()
    exist = ex[::-1]
    
    if exist is None:
        conn.commit()
        conn.close()
        print "there are no stories"
        return null
    
    else:
        conn.commit()
        conn.close()
        return exist

def loadTree(title):

    conn = sqlite3.connect("database")
    c = conn.cursor()
    c.execute('SELECT * FROM stories where title= ?', (title,))

    exist = c.fetchall()
    
    if exist is None:
        conn.commit()
        conn.close()
        print "you have no stories"
        return null
    
    else:
        conn.commit()
        conn.close()
        return exist
    
def loadSubTree(title,ID):

    conn = sqlite3.connect("database")
    c = conn.cursor()
    c.execute('SELECT parentid FROM stories WHERE title= ? AND id= ?', (title,ID))
    parent = c.fetchone()
    c.execute('SELECT * FROM stories WHERE title= ? AND (parentid= ? OR id= ?)', (title,ID,parent))

    exist = c.fetchall()
    
    if exist is None:
        conn.commit()
        conn.close()
        return null
    
    else:
        conn.commit()
        conn.close()
        return exist
    
#get a single story's data by ID
def getStory(story_id):
    
    conn = sqlite3.connect("database")
    c = conn.cursor()
    c.execute('CREATE TABLE IF NOT EXISTS stories(id integer primary key, title varchar(24), content varchar(100), date text, user varchar(24), parentid integer, upvotes integer, downvotes integer, FOREIGN KEY(user) REFERENCES users(name))')

    #get the story based on inputted ID
    c.execute('SELECT * FROM stories WHERE id=?',(story_id,))

    exist = c.fetchone()

    #no story with this id -> return null
    if exist is None:
        conn.commit()
        conn.close()
        return None

    #return this story's data if it exists
    else:
        conn.commit()
        conn.close()
        return exist

def rate(up, down, ID):
     conn = sqlite3.connect("database")
     c = conn.cursor()
     #create a new table called votes that will use user, and story id to get data
     c.execute('CREATE TABLE IF NOT EXISTS stories(id integer primary key, title varchar(24), content varchar(100), date text, user varchar(24), parentid integer, upvotes integer, downvotes integer, FOREIGN KEY(user) REFERENCES users(name))')
     
     #get votes based on inputted id and the user name
     c.execute('UPDATE stories SET upvotes= ?, downvotes= ? WHERE id= ?',(up, down, ID))
     exist = c.fetchone()

     if exist is None:
        conn.commit()
        conn.close()
        return None

    #return this story's data if it exists
     else:
        conn.commit()
        conn.close()
        return exist




