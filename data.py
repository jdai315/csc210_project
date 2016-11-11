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
    c.execute('SELECT pw from users where name= ?',(username,))
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

def addStory(title, content, user):
    
    #connect to the database 'userpw'
    conn = sqlite3.connect("database")
    c = conn.cursor()
    now = datetime.datetime.now()
        
    #create a table if it doesn't exist
    #c.execute('DROP TABLE stories')
    c.execute('CREATE TABLE IF NOT EXISTS stories(title varchar(24) primary key, content varchar(100), date text, user varchar(24), FOREIGN KEY(user) REFERENCES users(name))')

    #this is where the cursor checks if the username already exists
    c.execute('SELECT content from stories where title= ? and user= ?',(title, user))
    exist = c.fetchone()
    
    #if it isnt already in the table, insert it
    if exist is None:
        c.execute('INSERT OR IGNORE INTO stories(title, content, date, user) VALUES(?,?,?,?)', (title, content, now, user))
        conn.commit()
        conn.close()
        return True

    else:
        conn.commit()
        conn.close()
        return False

def getStories(user=0, others=0):
    
    conn = sqlite3.connect("database")
    c = conn.cursor()
    if (user==0):
        c.execute('SELECT * FROM stories')
    elif (others==1):
        c.execute('SELECT * FROM stories WHERE user!= ?', (user,))
    else:
        c.execute('SELECT * FROM stories WHERE user= ?', (user,))
        
    exist = c.fetchall()

    if exist is None:
        conn.commit()
        conn.close()
        return "You have no stories."
    
    else:
        conn.commit()
        conn.close()
        return exist
    




