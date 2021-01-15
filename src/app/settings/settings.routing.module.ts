import {Injectable, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule,} from '@angular/router';
import {SettingsComponent} from './settings.component';
import {SpeedComponent} from "./speed/speed.component";
import {OtherComponent} from "./other/other.component";
import {StorageSettingComponent} from "./storage/storage_setting.component";
import {ColorSchemeComponent} from "./scheme/color_scheme.component";


const settingsRoutes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      {
        path: 'speed',
        component: SpeedComponent,
      },
      {
        path: 'other',
        component: OtherComponent,
      },
      {
        path: 'storage',
        component: StorageSettingComponent,
      },
      {
        path: 'scheme',
        component: ColorSchemeComponent,
      },
      {
        path: 'settings',
        component: SpeedComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(settingsRoutes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {
}
