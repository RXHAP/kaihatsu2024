#!/home/rxhap/rxhap.com/vote_venv/bin/python
from wsgiref.handlers import CGIHandler
from vote_check import app
CGIHandler().run(app)
