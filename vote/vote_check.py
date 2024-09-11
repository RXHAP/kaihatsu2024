from flask import Flask
import mysql.connector

app = Flask(__name__)

@app.route('/')
def hello_world():
  return '200'

@app.route("/<id>")
def id_check(id):
  connector = mysql.connector.connect(
    host="localhost",
    user="rxhap_2024",
    password="kmarisa1009",
    database="rxhap_vote2024"
  )
  cursor = connector.cursor()
  sql = "select * from vote_check where id="+str(id)
  cursor.execute(sql)
  result = cursor.fetchall()

  cursor.close()
  connector.close()
  return result