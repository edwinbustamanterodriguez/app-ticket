import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule,} from '@angular/router';
import {SettingsComponent} from './settings.component';
import {SliderComponent} from "./slider_settings/slider.component";
import {OtherComponent} from "./other/other.component";
import {ColorSchemeComponent} from "./scheme/color_scheme.component";


const settingsRoutes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      {
        path: 'slider',
        component: SliderComponent,
      },
      {
        path: 'other',
        component: OtherComponent,
      },
      {
        path: 'scheme',
        component: ColorSchemeComponent,
      },
      {
        path: 'settings',
        component: SliderComponent,
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
