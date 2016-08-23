import { Component } from '@angular/core';

import { QueuedVideo } from './queued-video';

// Temporary hard-coding of the videos
const VIDEO_QUEUE: QueuedVideo[] = [
    {id: 1, name: 'Morrowind Tim Allen', video_id: 'NF-XMtNEudQ', source_user: 'Senney'},
    {id: 2, name: 'Chihuahua fail', video_id: 'DLKSb7f6BUc', source_user: 'Senney'},
    {id: 3, name: 'ハムマリオ', video_id: 'T9-dXJl2I0s', source_user: 'Senney'},
    {id: 4, name: '1-Minute Hollandaise', video_id: 'rOWzVV_XrcM', source_user: 'Senney'},
];

@Component({
    selector: 'my-app',
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
export class AppComponent {
    title = 'TubeTable';
    videos = VIDEO_QUEUE;
    selectedVideo: QueuedVideo;

    onSelect(video: QueuedVideo): void {
        this.selectedVideo = video;
    }
}
