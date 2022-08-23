import os
import sys
from pathlib import Path
import subprocess

application_path = os.path.dirname(sys.executable)
server = Path(application_path).absolute()

print("""

=======================================================
=======================================================
                     SEX MAKER 3000
=======================================================
=======================================================


---------------- Breeding Lizards... ------------------

""")

eprms = [
	str(server / 'htbin' / '7z' / '7z.exe'),
	'x',
	'-o' + str(server / 'htbin'),
	str(server / 'htbin' / 'python.7z'),
	'-aoa'
]

# exec unpacking
subprocess.call(eprms)

print('--------------------- Finalizing ----------------------')

with open(str(server / 'launcher.cmd'), 'w') as launcher:
	launcher.write('cd /d ')
	launcher.write('"' + str(server) + '"')
	launcher.write('\n')

	launcher.write('"' + str(server / 'htbin' / 'python' / 'bin' / 'python.exe') + '"')
	launcher.write(' -m http.server --cgi')

	launcher.write('\n')

	launcher.write('explorer "http://localhost:8000/"')


print('------------------------ DONE ------------------------')