import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MydatasComponent } from './mydatas.component';

const routes: Routes = [{ path: '', component: MydatasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MydatasRoutingModule { }
