import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './entities/detail/detail-routing.module';
import {SettingsRoutingModule} from './settings/settings.routing.module';
import {GridRoutingModule} from './grid/grid.routing.module';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy',useHash:true}),
    HomeRoutingModule,
    DetailRoutingModule,
    SettingsRoutingModule,
    GridRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
