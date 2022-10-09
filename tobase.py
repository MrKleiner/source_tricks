from pathlib import Path
import json, base64



thisdir = Path(__file__).parent
print(thisdir)

for at in (thisdir / 'content').glob('*'):
	try:
		original = json.loads((at / at.name).read_bytes())

		for bx in original['boxes']:
			bx['text'] = base64.b64encode(bx['text'].encode()).decode()

		(at / at.name).write_text(json.dumps(original))
	except:
		continue

