from collections import deque
import random
from urllib.parse import urlparse, parse_qs
from bottle import template, Bottle, request, redirect, response
from staticontent import StaticContent
import logging
import json


class Tubetable(object):

    def __init__(self, addr='localhost', port=8080, debug=True, secret="Tubetable"):
        logging.basicConfig(level=logging.DEBUG)
        self.log = logging.getLogger('Tubetable')
        self.log.info("Initializing Tubetable.")
        self._addr = addr
        self._port = port
        self._debug = debug

        self._secret = secret
        self._host_key = None

        #self._videos = deque(['AhbBo-209go', 'B-dUekPt5s8', 'dpyiew3kpz8'])
        self._videos = deque(['B-dUekPt5s8'])
        self._current = None

        self._app = Bottle()
        self._build_routes()
        self.log.info("Finished initializing Tubetable.")

    def start(self):
        self.log.info("Starting Tubetable.")
        self._app.run(host=self._addr, port=self._port, debug=self._debug)

    def _build_routes(self):
        self.log.info("Building routes.")
        static = StaticContent(self._app)
        static.add('/static/js/<filename:re:.*\.js>', 'static/js')
        static.add('/static/css/<filename:re:.*\.css>', 'static/css')
        static.add('/static/images/<filename:path>', 'static/img')
        self._app.route('/', callback=self.index)
        self._app.route('/enqueue', method='POST', callback=self.queue)
        self._app.route('/head', method='GET', callback=self.head)
        self._app.route('/host', method='GET', callback=self.host)
        self._app.route('/list', method='GET', callback=self.list)
        self._app.route('/current', method='GET', callback=lambda: json.dumps(self._current))

    def _generate_host_key(self):
        self._host_key = "{}+{}".format(request.environ['REMOTE_ADDR'], random.randint(10000,99999))
        return self._host_key

    def _get_youtube_id(self, value):
        """
        Nicked from: https://stackoverflow.com/a/7936523
        Author: Mikhail Kashkin

        Examples:
        - http://youtu.be/SA2iWivDJiE
        - http://www.youtube.com/watch?v=_oPAwA_Udwc&feature=feedu
        - http://www.youtube.com/embed/SA2iWivDJiE
        - http://www.youtube.com/v/SA2iWivDJiE?version=3&amp;hl=en_US
        """
        query = urlparse(value)
        if query.hostname == 'youtu.be':
            return query.path[1:]
        if query.hostname in ('www.youtube.com', 'youtube.com'):
            if query.path == '/watch':
                p = parse_qs(query.query)
                return p['v'][0]
            if query.path[:7] == '/embed/':
                return query.path.split('/')[2]
            if query.path[:3] == '/v/':
                return query.path.split('/')[2]
        # fail?
        return None

    def _is_host(self):
        if self._host_key is not None and \
           self._host_key == request.get_cookie('host-key', secret=self._secret):
            return True
        return False

    def index(self):
        return template("index.tpl", host_key=self._host_key)

    def queue(self):
        video_id = self._get_youtube_id(request.forms.get('video_id'))
        if video_id is None or video_id in self._videos:
            redirect('/')
        self._videos.append(video_id)
        redirect('/')

    def list(self):
        return json.dumps(list(self._videos))

    def head(self):
        if len(self._videos) > 0:
            self._current = self._videos.popleft()
            return json.dumps(self._current)
        else:
            self._current = None
            response.status = 404

    def host(self):
        if self._host_key is not None:
            if self._host_key != request.get_cookie('host-key', secret=self._secret):
                redirect('/')
        else:
            key = self._generate_host_key()
            response.set_cookie('host-key', key, self._secret)

        return template('watch')


if __name__ == "__main__":
    app = Tubetable(addr='0.0.0.0')
    app.start()
