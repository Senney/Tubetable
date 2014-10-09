
var tag = $('<script></script>').attr({src: "https://www.youtube.com/iframe_api"});
$("script:first-of-type").prepend(tag);

function getNext(callback) {
    $.ajax({
        url: '/head',
        dataType: 'json'
    }).success(function(data) {
        callback(data);
    }).fail(function(data) {
        setTimeout(function() { getNext(callback) }, 5000);
    });
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
}

function onPlayerReady(event) {
    event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        getNext(function(next) { player.loadVideoById({videoId: next }); })
    }
}
