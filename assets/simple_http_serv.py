import os
import signal
from http.server import HTTPServer, CGIHTTPRequestHandler

mypid = os.getpid()



def receive_signal(signum, stack):
    print('Received signal: ', signum)
    print('stack: ', stack)
    global some_global_var_that_my_request_controller_will_set
    some_global_var_that_my_request_controller_will_set = False
    
signal.signal(signal.SIGBREAK, receive_signal)

some_global_var_that_my_request_controller_will_set = True

def keep_running():
    global some_global_var_that_my_request_controller_will_set
    return some_global_var_that_my_request_controller_will_set


server_address = ("", 8000)
httpd = HTTPServer(server_address, CGIHTTPRequestHandler)
# httpd.serve_forever()
while keep_running():
    print("start  handle request")
    httpd.handle_request()
    print("finish handle request")    
    
    
os.kill(mypid, signal.SIGTERM)



