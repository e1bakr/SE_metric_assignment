from http.server import HTTPServer, BaseHTTPRequestHandler
from getdata import getBasicData
import json



class Server(BaseHTTPRequestHandler):
    
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        try:
            file = open(self.path[1:]).read()
            self.send_response(200)
        except:
            file = "File not found"
            self.send_response(404)
        self.end_headers()
        self.wfile.write(bytes(file, 'utf-8'))
        
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        self.send_response(200)
        self.end_headers()
        data = getBasicData(post_data.decode("utf-8"))
        self.wfile.write(bytes(json.dumps(data), 'utf-8'))
        


serv = HTTPServer(('localhost', 8000), Server)
serv.serve_forever()