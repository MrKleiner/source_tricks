#!\python\bin\python.exe
import os, sys, json, hashlib, base64, cgi
from tools import *
from pathlib import Path
from random import seed
from random import random



# =============================================
#					Setup
# =============================================

# parse url params into a dict, if any
get_cgi_params = cgi.parse()
url_params = {}
for it in get_cgi_params:
	url_params[it] = ''.join(get_cgi_params[it])

# read body content, if any
byte_data = b''
try:
	byte_data = sys.stdin.buffer.read()
except:
	pass


# fuck it, it's always byte data
sys.stdout.buffer.write(b'Content-Type: application/octet-stream\n\n')

# server root folder
server = Path(__file__).parent.parent

# =============================================
#					Setup
# =============================================










# save the text part of the article (basically everything except media)
# requires certain url params to be present
def save_article():
	# create folders
	(server / 'content' / url_params['article_id'] / 'data').mkdir(parents=True, exist_ok=True)

	# save article to a file
	with open(str(server / 'content' / url_params['article_id'] / url_params['article_id']), 'wb') as article:
		# hardcore_censor = {
		# 	'lenin': 'Hitler',
		# 	'stalin': 'Mein Fuhrer',
		# 	'ussr': '3rd Reich'
		# }
		# towrite = byte_data.decode()
		# for cship in hardcore_censor:
			# towrite = towrite.replace(cship, hardcore_censor[cship])

		article.write(byte_data)

	return json.dumps({'response': 'full_success'})


# save media, like images
def save_media():
	# create folders
	(server / 'content' / url_params['article_id'] / 'data').mkdir(parents=True, exist_ok=True)

	# save media to a file
	with open(str(server / 'content' / url_params['article_id'] / 'data' / btostr(url_params['media_id'])), 'wb') as media:
		media.write(byte_data)

	return json.dumps({'response': 'full_success'})



# save the catalogue
def save_ctg():
	# save catalogue to a file
	with open(str(server / 'content_index.sex'), 'wb') as ctg:
		ctg.write(byte_data)

	return json.dumps({'response': sys.version})



# do match
# BROS BEFORE HOES: The chad person contributing to this website the most is still using win7
# python 3.10 is not available for win7. Match is not available in older python versions
# therefore, an old system of if statements has to be used
"""
match url_params['do']:
	case 'save_text':
		sys.stdout.buffer.write(save_article().encode())
	case _:
		# sys.stdout.buffer.write(json.dumps({'error': 'unknown_action'}).encode())
		pass
"""

if url_params['do'] == 'save_text':
	sys.stdout.buffer.write(save_article().encode())

if url_params['do'] == 'save_img':
	sys.stdout.buffer.write(save_media().encode())

if url_params['do'] == 'save_ctg':
	sys.stdout.buffer.write(save_ctg().encode())

