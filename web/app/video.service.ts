import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Configuration } from './app.constants';
import { QueuedVideo } from './queued-video';

@Injectable()
export class VideoService {

    dataUrl: string;

    constructor(private http: Http,
                private configuration: Configuration) {
        this.dataUrl = configuration.ApiServer + 'videos'
    }

    getVideos(): Promise<QueuedVideo[]> {
        return this.http.get(this.dataUrl)
                   .toPromise()
                   .then(response => response.json().data as QueuedVideo[])
                   .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred while retrieving the data.', error);
        return Promise.reject(error.message || error);
    }
}
