import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { VideoService } from './video.service';
import { QueuedVideo } from './queued-video';


@Component({
    selector: 'my-app',
    providers: [VideoService],
    template: `
        <h1>{{title}}</h1>
        <video-view [video]='selectedVideo'></video-view>

        <h2>Queued Videos</h2>
        <ul class='videos'>
            <li *ngFor="let video of videos" (click)="onSelect(video)"
                [class.selected]="video == selectedVideo">
                <span class="badge">{{video.source_user}}</span>
                <span class="videoName">{{video.name}}</span>
                <span class="badge badge-actions">X ✓</span>
            </li>
        </ul>
    `,
    styles: [`
        .selected {
            background-color: #CFD8DC !important;
            color: white;
        }

        .videos {
            margin: 0 0 2em 0;
            list-style-type: none;
            padding: 0;
            width: 25em;
        }

        .videos li {
            cursor: pointer;
            position: relative;
            left: 0;
            background-color: #EEE;
            margin: .5em;
            padding: .3em 0;
            height: 1.6em;
            border-radius: 4px;
        }

        .videos li.selected:hover {
            background-color: #BBD8DC !important;
            color: white;
        }

        .videos li:hover {
            color: #607D8B;
            background-color: #DDD;
        }
        .videos .text {
            position: relative;
            top: -3px;
        }
        .videos .badge {
            display: inline-block;
            font-size: small;
            color: white;
            padding: 0.8em 0.7em 0 0.7em;
            background-color: #607D8B;
            line-height: 1em;
            position: relative;
            left: -1px;
            top: -4px;
            width: 5em;
            height: 1.8em;
            margin-right: .8em;
            border-radius: 4px 0 0 4px;
        }

        .videos .badge-actions {
            background-color: #688B60;
            right: 0px;
            margin-right: 0em;
            border-radius: 0 4px 4px 0;
            float: right;
            width: 2em;
        }
    `]
})
export class AppComponent implements OnInit {
    title = 'TubeTable';
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
