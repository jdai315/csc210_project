import sqlite3

#add new uname/pw to database
def addNew(username, password):

    #connect to the database 'userpw'
    conn = sqlite3.connect("userpw")
    c = conn.cursor()

    #create a table if it doesn't exist where usernames are in 'name' and passwords are in 'pw'
    c.execute('CREATE TABLE IF NOT EXISTS users(name varchar(24) primary key, pw varchar(24), UNIQUE(name, pw))')

    #this is where the cursor checks if the username already exists
    c.execute('SELECT pw from users where name= ?',(username,))
    exist = c.fetchone()

    #if it isnt already in the table, insert it
    if exist is None:
        c.execute('INSERT OR IGNORE INTO users(name, pw) VALUES(?,?)', (username, password))
<<<<<<< HEAD
        #c.execute('INSERT OR IGNORE INTO users(name, pw) VALUES(\"' + username + '\", \"' + password + '\")')
=======
>>>>>>> ddee5155f451f57352309142c6ad72114b9d12ac
        conn.commit()
        conn.close()
        return True

    #otherwise, return false to tell app.py that registering failed
    else:
        conn.commit()
        conn.close()
        return False

#check if user/pw matches
def check(username, password):

    #connect to the database 'userpw'
    conn = sqlite3.connect("userpw")
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