#!/home/xs765341/kaichi-fes.jp/python/vote_venv/bin/python
from wsgiref.handlers import CGIHandler
from vote_check import app
CGIHandler().run(app)
