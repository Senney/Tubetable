import { Injectable } from '@angular/core';

import { QueuedVideo } from './queued-video';
import { VIDEO_QUEUE } from './mock-videos';

@Injectable()
export class VideoService {
    getVideos(): Promise<QueuedVideo[]> {
        return Promise.resolve(VIDEO_QUEUE);
    }
}
