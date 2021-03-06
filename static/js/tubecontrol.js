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
            setTimeout(function() {
                inWaiting = false;
                getNext(callback);
            }, 5000);
        }
        inWaiting = true;
    });
}

function getVideoList() {
    $.ajax({
        url: '/list',
        dataType: 'json'
    }).success(function(data) {
        getCurrent(function(curr) {
            $("#queue").empty();
            if (curr == null) {
                return;
            }

            if (!$.isArray(data)) {
                setVideoList([curr, data]);
            } else {
                data.unshift(curr);
                setVideoList(data);
            }
        });
    });
}

function setVideoList(data) {
    console.log(data);
    for (var v in data) {
        tag = $("<li></li>")
            .addClass("list-group-item")
            .text("Loading name...");
        $("#queue").append(tag);
        getVideoName(data[v], function(name) {
            tag.text(name);
        });
    }
}

function getVideoName(id, callback) {
    if (cache[id] != undefined) {
        callback(cache[id]);
        return;
    }

    name = "No video name found.";
    cache[id] = "Pending";
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+id+"&key=AIzaSyBzQ0qIlZ6ZNcmSXGZKD-2z_LQjZK0dpcQ",
        dataType: 'json'
    }).success(function(data) {
        name = data['items']['0']['snippet']['title'];
        callback(name);
        cache[id] = name;
    }).fail(function() {
        callback(name);
        cache[id] = name;
    });
}

function getCurrent(callback) {
    if (current != undefined) {
        callback(current);
        return;
    }

    $.ajax({
        url: '/current',
        dataType: 'json'
    }).success(function(data) {
        callback(data);
    });
}

function playNext() {
    getNext(function(next) { player.loadVideoById({videoId: next }); })
}

function enqueueVideo() {
    vid = $("#video_id").val()
    $("#video_id").reset();
    $.post('/enqueue', $("#queueForm").serialize());
}
