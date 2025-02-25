import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePage } from './home/home.page';
// import { ScenePage } from './scene/scene.page';
import { DrawPage } from './draw/draw.page';
import { AwardPage } from './award/award.page';
import { HttpClientModule } from '@angular/common/http';
import { InfoPage } from './info/info.page';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { ReactiveFormsModule } from '@angular/forms';
import { ScenePageModule } from './scene/scene.module';
@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    // ScenePage,
    DrawPage,
    AwardPage,
    InfoPage
  ],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ScenePageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
