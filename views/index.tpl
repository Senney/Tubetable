<html>
    <head>
        <script src="/static/js/jquery-2.1.1.min.js"></script>
        <script src="/static/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="/static/css/bootstrap.min.css">
        <link rel="stylesheet" href="/static/css/bootstrap-theme.min.css">
        <script src="/static/js/tubecontrol.js"></script>
        <script>
            $(function() { setInterval(getVideoList, 1500); });
        </script>
    </head>
    <body>
        <div class="container">
            <h1>Tubetable</h1>

            <h3>Queue</h3>
            <div class="row">
                <form action="/enqueue" method="POST" role="form">
                    <div class="control-group">
                        <div class="col-md-4 col-md-offset-3">
                            <input type="text" class="form-control" id="video_id" name="video_id"
                                   placeholder="Youtube Video ID">
                        </div>
                        <div class="col-md-2">
                            <button type="submit" class="btn btn-success">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            <hr>
            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <ul class="list-group" id="queue">

                    </ul>
                </div>

            </div>

            <div class="footer">
                <p>{{!"The host is available" if host_key else "<a href='/host'>Click here if you're the host.</a>"}}</p>
            </div>
        </div>
    </body>
</html>