import { Component, Input } from '@angular/core';

import { QueuedVideo } from './queued-video';

@Component({
    selector: 'video-view',
    template: `
        <h2>Current Video</h2>
        <div *ngIf="video">
            <div class='videoContainer'>
                <h3>{{video.name}}</h3>
            </div>
        </div>
    `
})
export class VideoViewComponent {

    @Input()
    video: QueuedVideo;

}
