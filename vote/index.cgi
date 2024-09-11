#!/home/rxhap/rxhap.com/public_html/venv/bin/python
from wsgiref.handlers import CGIHandler
from vote_check import app
CGIHandler().run(app)
