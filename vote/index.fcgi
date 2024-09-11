#!/home/rxhap/rxhap.com/python/vote_venv/bin/python
from flup.server.fcgi import WSGIServer
from vote_check import app

if __name__ == '__main__':
  WSGIServer(app).run()