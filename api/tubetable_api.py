#!/usr/bin/python3
from flask import Flask
from flask import jsonify

app = Flask(__name__)

videos = [
    {'id': 1, 'name': 'Morrowind Tim Allen', 'video_id': 'NF-XMtNEudQ',
     'source_user': 'Senney'},
    {'id': 2, 'name': 'Chihuahua fail', 'video_id': 'DLKSb7f6BUc',
     'source_user': 'Senney'},
    {'id': 3, 'name': 'ハムマリオ', 'video_id': 'T9-dXJl2I0s',
     'source_user': 'Senney'},
    {'id': 4, 'name': '1-Minute Hollandaise', 'video_id': 'rOWzVV_XrcM',
     'source_user': 'Senney'},
]


@app.route('/tubetable/api/v1.0/videos', methods=['GET'])
def get_videos():
    return jsonify({'data': videos})


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods',
                         'GET,PUT,POST,DELETE,HEAD')
    return response


if __name__ == '__main__':
    app.run(threaded=True)
