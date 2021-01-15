import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import {NgxSliderModule} from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective],
  imports: [CommonModule, TranslateModule, FormsModule,NgxSliderModule],
  exports: [TranslateModule, WebviewDirective, FormsModule,NgxSliderModule]
})
export class SharedModule {}
