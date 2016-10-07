import sqlite3

#add new uname/pw to database
def addNew(username, password):
    #connect to the database 'userpw'
    #create a table if it doesn't exist where usernames are in 'name' and passwords are in 'pw'
    conn = sqlite3.connect("userpw")
    c = conn.cursor()
    c.execute('CREATE TABLE IF NOT EXISTS users(name varchar(24) primary key, pw varchar(24), UNIQUE(name, pw))')
    
    #if it isnt already in the table, insert it
    if 1==1:
        c.execute('INSERT OR IGNORE INTO users(name, pw) VALUES(\"' + username + '\", \"' + password + '\")')
        conn.commit()
        conn.close()
        return True
    else:
        conn.commit()
        conn.close()
        return False

#check if user/pw matches
def check(username, password):
    user = None
    #if user doesnt exist, test fails. if password isnt the same as the stored password, test fails. otherwise, the test passes.
    if user==None:
        return False
    else:
        return password == user.get("pw").encode('ascii','ignore')

def count():
    return posts.count()

def show():
    return posts.find()
