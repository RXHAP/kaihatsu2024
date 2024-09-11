from flask import Flask
import mysql.connector
import sys

sys.path.append("/home/rxhap/rxhap.com/python/vote_venv/lib/python3.12/site-packages")
app = Flask(__name__)

@app.route('/')
def hello_world():
  return 'success!'

@app.route("/api/<id>")
def id_check(id):
  connector = mysql.connector.connect(
    host="127.0.0.1",
    user="rxhap_2024",
    password="kmarisa1009",
    database="rxhap_vote2024"
  )
  cursor = connector.cursor()
  sql = "select * from vote_check where id="+id
  cursor.execute(sql)
  result = cursor.fetchall()

  cursor.close()
  connector.close()
  for row in result:
    return row