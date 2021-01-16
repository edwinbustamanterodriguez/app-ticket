import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {GridComponent} from "./grid.component";
import {GridRoutingModule} from "./grid.routing.module";
import {ElectronService} from "ngx-electron";

@NgModule({
  imports: [CommonModule, SharedModule, GridRoutingModule],
  declarations: [GridComponent,

  ],
  entryComponents: [GridComponent],
  providers:[ElectronService]
})
export class GridModule {
}
