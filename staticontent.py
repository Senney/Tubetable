from bottle import static_file
import logging


class StaticContent(object):

    def __init__(self, app):
        self._app = app

    def add(self, route, directory):
        print("Adding route: {} => {}".format(route, directory))
        return self._app.route(route, callback=lambda filename: static_file(filename, root=directory))

