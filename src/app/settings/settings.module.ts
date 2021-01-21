import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingsRoutingModule} from './settings.routing.module';

import {SettingsComponent} from './settings.component';
import {SharedModule} from '../shared/shared.module';
import {SliderComponent} from "./slider_settings/slider.component";
import {OtherComponent} from "./other/other.component";
import {StorageSettingComponent} from "./storage/storage_setting.component";
import {ColorSchemeComponent} from "./scheme/color_scheme.component";

@NgModule({
  imports: [CommonModule, SharedModule, SettingsRoutingModule],
  declarations: [SettingsComponent,
    SliderComponent,
    StorageSettingComponent,
    ColorSchemeComponent,
    OtherComponent,
  ],
  entryComponents: [SettingsComponent],
})
export class SettingsModule {
}
