from flask import Flask
import mysql.connector

app = Flask(__name__)

@app.route('/')
def hello_world():
  return 'success!'

@app.route("/api/<id>/")
def id_check(id):
  connector = mysql.connector.connect(
    host="127.0.0.1",
    user="xs765341_2024",
    password="kmarisa1009",
    database="xs765341_vote2024"
  )
  cursor = connector.cursor()
  sql = "select * from vote_check where id="+id
  cursor.execute(sql)
  result = cursor.fetchall()

  cursor.close()
  connector.close()
  print(result)
  for row in result:
    return str(row)
  if str(result) == "[]":
    return "そんなIDねえよ うるせえよ"