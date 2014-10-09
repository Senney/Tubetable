<html>
    <head>
        <script src="/static/js/jquery-2.1.1.min.js"></script>
        <script src="/static/js/bootstrap.min.js"></script>
        <script src="/static/js/tubetable.js"></script>
        <link rel="stylesheet" href="/static/css/bootstrap.min.css">
        <link rel="stylesheet" href="/static/css/bootstrap-theme.min.css">
    </head>
    <body>
        <div class="container">
            <h1>Host Mode</h1>

            <h3>Current Video</h3>
            <div class="row">
                <div id="player" class="center-block">
                    <!-- The youtube player will go here -->
                </div>
            </div>

            <div class="row">
                <button class="btn btn-primary" onclick="playNext()">Skip</button>
            </div>

            <hr>

            <div class="row">
                <ul class="list-group" id="queue">

                </ul>
            </div>
        </div>
    </body>
</html>