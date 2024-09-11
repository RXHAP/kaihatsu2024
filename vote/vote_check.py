from flask import Flask
import mysql.connector

app = Flask(__name__)

@app.route('/')
def hello_world():
  return '200'

@app.route("/<id>")
def id_check(id):
  conn = mysql.connector.connect(
    host="localhost",
    user="rxhap_2024",
    password="kmarisa1009",
    database="rxhap_vote2024"
  )
  cursor = conn.cursor()
  cursor.execute("select * from vote_check where id="+id+";")
  result = cursor.fetchall()

  cursor.close()
  conn.close()
  return result