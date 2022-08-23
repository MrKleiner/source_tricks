import os
import sys
from pathlib import Path
import subprocess

application_path = os.path.dirname(sys.executable)
server = Path(application_path).absolute()

eprms = [
	str(server / 'htbin' / '7z' / '7z.exe'),
	'x',
	'-o' + str(server / 'htbin'),
	str(server / 'htbin' / 'python.7z'),
	'-aoa'
]

# exec unpacking
subprocess.call(eprms)