def eval_md5(st):
	import hashlib
	if isinstance(st, bytes):
		hash_object = hashlib.md5(st)
	else:
		text = str(st)
		hash_object = hashlib.md5(text.encode())
	
	md5_hash = hash_object.hexdigest()
	return md5_hash


def strtob(st):
	import base64
	convert = str(st).encode()
	return base64.b64encode(convert).decode()

def btostr(bt):
	import base64
	convert = str(bt).encode()
	return base64.b64decode(convert).decode()