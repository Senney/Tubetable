package main

import (
  "log"
  "net/http"

  "github.com/gorilla/mux"
)

// Defines the structure of the API. The API should be versioned
// (e.g. /tubetable/api/v1.0) to allow multiple versions to be running
// when the API server is updated.
type Routes struct {
  Root        *mux.Router
  ApiRoot     *mux.Router

  Users       *mux.Router
  Videos      *mux.Router
}

// Wraps the Routes structure to allow it to provide the ServeHTTP
// function required by http.Handler.
type RouteWrapper struct {
  router *mux.Router
}

// Forward the HTTP request to the router to be handled. Add any required
// headers for the request.
func (rw *RouteWrapper) ServeHTTP(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Access-Control-Allow-Origin", "*")
  w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization")
  w.Header().Set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,HEAD")
  rw.router.ServeHTTP(w, r)
}

// Global route container for the API.
var BaseRoutes *Routes

func main() {
  log.Print("Starting webserver. http://localhost:8080")

  BaseRoutes = &Routes{}
  BaseRoutes.Root     = mux.NewRouter().StrictSlash(true)
  BaseRoutes.ApiRoot  = BaseRoutes.Root.PathPrefix("/tubetable/api/v1.0").Subrouter()
  BaseRoutes.Videos   = BaseRoutes.ApiRoot.PathPrefix("/videos").Subrouter()

  VideoInitRoutes()

  var handler http.Handler = &RouteWrapper{BaseRoutes.Root}
  log.Fatal(http.ListenAndServe("0.0.0.0:8080", handler))
}
