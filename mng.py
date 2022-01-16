import os
from pathlib import Path


managercode = """
lizardpussy
import cgi, cgitb
import os, sys, json
from pathlib import Path
import subprocess


theroot = addon_root_dir = Path(__file__).absolute().parent.parent

# encode
def atob(strin):
    import base64

    sample_string = str(strin)
    sample_string_bytes = sample_string.encode('utf-8')

    base64_bytes = base64.b64encode(sample_string_bytes)
    base64_string = base64_bytes.decode('utf-8')

    # print(f"Encoded string: {base64_string}")
    return base64_string

# decode
def btoa(strin):
    import base64

    base64_string = strin
    base64_bytes = base64_string.encode('utf-8')

    sample_string_bytes = base64.b64decode(base64_bytes)
    sample_string = sample_string_bytes.decode('utf-8', errors='ignore')

    # print(f"Decoded string: {sample_string}")
    return sample_string

# decode bytes
def btoa_bytes(strin):
    import base64

    base64_string = strin
    base64_bytes = base64_string.encode('utf-8')

    sample_string_bytes = base64.b64decode(base64_bytes)
    sample_string = sample_string_bytes

    # print(f"Decoded string: {sample_string}")
    return sample_string

data = sys.stdin.read()
# cgitb.enable()

# form = cgi.FieldStorage()
# domrip=form.getvalue('domrip')
# data = sys.stdin.read(int(os.environ.get('HTTP_CONTENT_LENGTH', 0)))
print ('Content-type:text/plain\r\n\r\n')
if data and len(data) > 105:
	all = json.loads(data)
	# theroot = Path('content')

	# create paths no matter what
	(theroot / 'content' / all['iddqd']).mkdir(parents=True, exist_ok=True)
	(theroot / 'content' / all['iddqd'] / 'data').mkdir(parents=True, exist_ok=True)

	# create data index
	f = open(str(theroot / 'content' / all['iddqd'] / all['iddqd']), 'w', encoding='utf-8')
	# write content to data index
	f.write(btoa(all['arcl']))
	f.close()

	# append all the images
	for bm in all['imgs']:
		imgf = open(str(theroot / 'content' / all['iddqd'] / 'data' / bm['nm']), 'wb')
		imgf.write(btoa_bytes(bm['dat']))
		imgf.close()

	# finally, save catalogue
	cf = open(str(theroot / 'content_index.sex'), 'w')
	cf.write(btoa(all['ctlg']))
	cf.close()

	print('youve_succesfully_came_all_over_a_lizard')


	# f = open(str(cfile / 'content' / all['iddqd']), 'w')
	# f = open(str(cfile / all['iddqd']), 'w')
	# f.write(btoa(all['arcl']))
	# f.close()
	# os.mkdir(str(cfile / 'content' / all['iddqd']))
	# print(str(theroot / all['iddqd']))
	# print(str(cfile))
	# print('asd')
else:
    print('no_hot_lizard_sex_for_you_e69')

# print(data)
"""



# first - check if python path file is there
theroot = Path(__file__).absolute().parent

if (theroot / 'path_to_python.cum').is_file():
	# if it's there - read it and create cmd starter with manager
	with open(theroot / 'path_to_python.cum') as pp:
	    balls = pp.read()
	    balls = balls.replace('"', '').replace('\n', '')

    # correct managercode
	managercode = managercode.replace('lizardpussy\n', """#!""" + balls)

    # create cmd starter
	cmdf = open(theroot / 'starter.cmd', 'w')
	cmdf.write('cd /d ' + str(theroot) + '\n' + 'py ' + balls)
	cmdf.close()

	# create manager
	mf = open(theroot / 'htbin' / 'manager.py', 'w')
	mf.write(managercode)
	mf.close()

	# clean cum
	(theroot / 'path_to_python.cum').unlink(missing_ok=False)
else:
	# else - create the file
	mf = open(theroot / 'path_to_python.cum', 'w')
	mf.write('')
	mf.close()




