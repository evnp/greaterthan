from flask import Flask, jsonify
from flask.ext.cors import CORS

app = Flask(__name__)
CORS(app)

url_map = {}

with open('url_map.txt') as f:
    for line in f.xreadlines():
        keyword, url = tuple(line.split())
        url_map[keyword] = url

@app.route('/')
def index():
    return jsonify(url_map)

@app.route('/lookup/<string:keyword>')
def lookup(keyword):
    return jsonify(dict(result=url_map.get(keyword, False)))

@app.route('/new/<string:keyword>/<path:url>')
def new(keyword, url):
    if keyword in url_map:
        return jsonify(dict(success=False))

    url_map[keyword] = url

    with open('url_map.txt', 'a') as f:
        f.write('\n%s %s' % (keyword, url))

    return jsonify(dict(success=True))

if __name__ == '__main__':
    app.run(debug=True)
