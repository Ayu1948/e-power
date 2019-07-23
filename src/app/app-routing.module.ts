import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomePage } from './home/home.page';
// import { ScenePage } from './scene/scene.page';
import { ScenePageModule } from './scene/scene.module';
import { DrawPage } from './draw/draw.page';
import { AwardPage } from './award/award.page';
import { InfoPage } from './info/info.page';

const routes: Routes = [
  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: '', component: HomePage },
  { path: 'scene/:id', loadChildren: './scene/scene.module#ScenePageModule' },
  { path: 'draw', component: DrawPage },
  { path: 'award', component: AwardPage },
  { path: 'info/:num', component: InfoPage }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
