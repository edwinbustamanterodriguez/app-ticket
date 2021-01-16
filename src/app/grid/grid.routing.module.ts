import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {GridComponent} from "./grid.component";

const gridRoutes: Routes = [
  {
    path: 'grid',
    component: GridComponent,
    /*children: [
      { path: 'speed', component: Storage_settingComponent},
      { path: 'other', component: OtherComponent},
      { path: 'settings', component: Storage_settingComponent}
    ]*/
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(gridRoutes)],
  exports: [RouterModule]
})
export class GridRoutingModule {}
