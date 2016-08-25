import { Component } from '@angular/core';

import { VideoService } from './video.service';


@Component({
    selector: 'app-component',
    providers: [VideoService],
    templateUrl: 'app/app.component.html'
})
export class AppComponent {
    title = 'TubeTable';
}
