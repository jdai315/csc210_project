#!/usr/bin/env python

# Lecture 08 - jQuery and Ajax

import sqlite3
import json # used to send data back in JSON format

print "Content-type: application/json"
print # without printing a blank line, the "end of script output before headers" error will occur


conn = sqlite3.connect('database')
cursor = conn.cursor()

data = {} # dictionary to store the response name/value pairs before JSON conversion

for story in cursor.execute('SELECT pw FROM users WHERE name=?',(user,)):
    data['title'] = story
    data['content'] = story[1]

json.dumps(data)


