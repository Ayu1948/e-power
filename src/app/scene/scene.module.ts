import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScenePage } from './scene.page';
import { BadgePage } from '../badge/badge.page';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { BadgePageModule } from '../badge/badge.module';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BadgePageModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    RouterModule.forChild([{ path: '', component: ScenePage }])
  ],
  entryComponents: [BadgePage],
  declarations: [ScenePage],
  exports: [ScenePage]
})
export class ScenePageModule {}
