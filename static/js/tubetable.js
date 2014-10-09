
var tag = $('<script></script>').attr({src: "https://www.youtube.com/iframe_api"});
$("script:first-of-type").prepend(tag);

var cache = {}
var inWaiting = false;
var current = undefined;

function getNext(callback) {
    $.ajax({
        url: '/head',
        dataType: 'json'
    }).success(function(data) {
        inWaiting = false;
        current = data;
        callback(data);
    }).fail(function(data) {
        if (!inWaiting) {
            setTimeout(function() { getNext(callback) }, 1500);
        }
        inWaiting = true;
    });
}

function getVideoList() {
    $.ajax({
        url: '/list',
        dataType: 'json'
    }).success(function(data) {
        if (!current) return;

        if (!$.isArray(data)) {
            setVideoList([current, data]);
        } else {
            data.unshift(current);
            setVideoList(data);
        }
    });
}

function getVideoName(id, callback) {
    if (cache[id] != undefined) {
        callback(cache[id]);
        return;
    }

    name = "No video name found.";
    cache[id] = "Pending";
    $.ajax({
        url: "https://gdata.youtube.com/feeds/api/videos/" + id + "?v=2&alt=json",
        dataType: 'json'
    }).success(function(data) {
        name = data['entry']['title']['$t'];
        callback(name);
        cache[id] = name;
    }).fail(function() {
        callback(name);
        cache[id] = name;
    });
}

function setVideoList(data) {
    console.log(data);
    $("#queue").empty();
    for (var v in data) {
        tag = $("<li></li>")
            .addClass("list-group-item");
        $("#queue").append(tag);
        getVideoName(data[v], function(name) {
            tag.text(name);
        });
    }
}

/**
    This is the Youtube API boilerplate.
**/


var player;
function onYouTubeIframeAPIReady() {
    getNext(function(video) {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: video,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    });

    setInterval(getVideoList, 5000);
}

function playNext() {
    getNext(function(next) { player.loadVideoById({videoId: next }); })
}

function onPlayerReady(event) {
    event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        playNext();
    }
}
