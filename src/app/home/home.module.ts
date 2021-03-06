import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import {NgTickerCustomComponent} from '../shared/components/ng_ticker_custom/ng-ticker-custom.component';

@NgModule({
  declarations: [HomeComponent, NgTickerCustomComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}
