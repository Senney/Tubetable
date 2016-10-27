package main

import (
  "encoding/json"
  "time"
  "net/http"
)

type VideoEntry struct {
  Name        string      `json:"name"`
  VideoID     string      `json:"url"`
  SourceUser  string      `json:"source_user"`
  Submitted   time.Time   `json:"submitted"`
}

type VideoQueue []VideoEntry

var videos VideoQueue = VideoQueue{
  VideoEntry{Name: "Morrowind Tim Allen", VideoID: "NF-XMtNEudQ", SourceUser: "Senney"},
  VideoEntry{Name: "ハムマリオ", VideoID: "T9-dXJl2I0s", SourceUser: "Senney"},
  VideoEntry{Name: "1-Minute Hollandaise", VideoID: "rOWzVV_XrcM", SourceUser: "fusionsdf"},
}

func VideoInitRoutes() {
  BaseRoutes.Videos.HandleFunc("/", VideosGet).Methods("GET")
  BaseRoutes.Videos.HandleFunc("/", VideoCreate).Methods("POST")
  BaseRoutes.Videos.HandleFunc("/{video_id}", VideoDelete).Methods("DELETE")
}

func VideosGet(w http.ResponseWriter, r *http.Request) {
  json.NewEncoder(w).Encode(videos)
}

func VideoCreate(w http.ResponseWriter, r *http.Request) {
  decoder := json.NewDecoder(r.Body)
  var video_obj VideoEntry

  err := decoder.Decode(&video_obj)
  if err != nil {
    w.WriteHeader(http.StatusBadRequest)
    return
  }

  videos = append(videos, video_obj)
}

func VideoDelete(w http.ResponseWriter, r *http.Request) {

}
