import { Component, Input } from '@angular/core';

import { QueuedVideo } from './queued-video';

@Component({
    selector: 'video-view',
    templateUrl: 'app/video-view.component.html'
})
export class VideoViewComponent {

    @Input()
    video: QueuedVideo;

}
