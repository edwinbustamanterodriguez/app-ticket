import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {ToDateTimePipe} from './directives/datetime/to_date_time';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective,ToDateTimePipe],
  imports: [CommonModule, TranslateModule, FormsModule,NgxSliderModule],
  exports: [TranslateModule, WebviewDirective, FormsModule,NgxSliderModule,ToDateTimePipe]
})
export class SharedModule {}
