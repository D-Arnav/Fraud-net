import db.insertion as insertion
import deletion
import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Drag0nb@llzgoat",
    database="Fraudnet"
)

insertion(conn)
# deletion(conn)

conn.close()
