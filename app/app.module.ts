// Angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// Application imports
import { AppComponent } from './app.component';
import { VideoViewComponent } from './video-view.component';

@NgModule({
    imports: [ BrowserModule, FormsModule ],
    declarations: [ AppComponent, VideoViewComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
