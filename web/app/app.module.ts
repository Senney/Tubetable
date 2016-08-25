// Angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Application imports
import { AppComponent } from './app.component';
import { TubetableComponent } from './tubetable.component';
import { VideoViewComponent } from './video-view.component';
import { Configuration } from './app.constants';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        TubetableComponent,
        VideoViewComponent
    ],
    providers: [
        Configuration
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
