import http.server
import socketserver
import urllib.request
import urllib.parse
import json
import sys
import os

PORT = 5000

class ProxyHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Allow CORS from any origin (e.g. Live Server on 5500 or file://)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, X-API-Key')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_GET(self):
        # Proxy Wallhaven API
        if self.path.startswith('/api/'):
            wallhaven_path = self.path[len('/api'):]
            target_url = f"https://wallhaven.cc/api{wallhaven_path}"
            try:
                req = urllib.request.Request(
                    target_url,
                    headers={
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                    }
                )
                with urllib.request.urlopen(req, timeout=10) as response:
                    content = response.read()
                    self.send_response(response.status)
                    self.send_header('Content-Type', response.headers.get('Content-Type', 'application/json'))
                    self.end_headers()
                    self.wfile.write(content)
            except urllib.error.HTTPError as e:
                self.send_response(e.code)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(e.read())
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))
            return

        # Proxy Wallhaven Image Downloads (bypasses browser CORS for canvas resizing)
        if self.path.startswith('/proxy-image?'):
            parsed = urllib.parse.urlparse(self.path)
            qs = urllib.parse.parse_qs(parsed.query)
            image_url = qs.get('url', [None])[0]
            if not image_url:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b'Missing url parameter')
                return
            try:
                req = urllib.request.Request(
                    image_url,
                    headers={'User-Agent': 'Mozilla/5.0'}
                )
                with urllib.request.urlopen(req, timeout=15) as response:
                    content = response.read()
                    self.send_response(200)
                    self.send_header('Content-Type', response.headers.get('Content-Type', 'image/jpeg'))
                    self.send_header('Content-Length', str(len(content)))
                    self.end_headers()
                    self.wfile.write(content)
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(str(e).encode('utf-8'))
            return

        # Serve static files (index.html, style.css, script.js)
        return super().do_GET()

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), ProxyHandler) as httpd:
        print(f"WallVault Server running at http://localhost:{PORT}")
        print("API proxy endpoint active at /api/v1/...")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...")
            httpd.server_close()
