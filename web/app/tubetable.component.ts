import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { QueuedVideo } from './queued-video';
import { VideoService } from './video.service';


@Component({
    selector: 'tubetable',
    templateUrl: 'app/tubetable.component.html',
    styleUrls: ['app/tubetable.component.css']
})
export class TubetableComponent implements OnInit {
    videos: QueuedVideo[];
    selectedVideo: QueuedVideo;

    // Inject the Video service.
    constructor(private videoService: VideoService) { }

    ngOnInit(): void {
        this.getVideos();
    }

    onSelect(video: QueuedVideo): void {
        this.selectedVideo = video;
    }

    getVideos(): void {
        // Resolve the promise and store as a property.
        this.videoService.getVideos().then(videos => this.videos = videos);
    }
}
