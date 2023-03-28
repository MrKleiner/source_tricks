import os
from pathlib import Path

application_path = os.path.dirname(sys.executable)
# print(application_path)



# first - check if python path file is there
# theroot = Path(__file__).absolute().parent
theroot = Path(application_path).absolute()

if (theroot / 'path_to_python.cum').is_file():
	# if it's there - read it and create cmd starter with manager
	with open(theroot / 'path_to_python.cum') as pp:
	    balls = pp.read()
	    balls = balls.replace('"', '').replace('\n', '')

    # correct managercode
	managercode = managercode.replace('lizardpussy', """#!""" + balls)

    # create cmd starter
	cmdf = open(theroot / 'starter.cmd', 'w')
	# cmdf.write('cd /d ' + str(theroot) + '\n' + 'explorer "http://localhost:8000/"' + '\n' + balls + ' ' + str(theroot / 'simple_http_serv.py'))
	cmdf.write('cd /d ' + str(theroot) + '\n' + 'explorer "http://localhost:8000/"' + '\n' + balls + ' ' + '-m http.server --cgi')
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
