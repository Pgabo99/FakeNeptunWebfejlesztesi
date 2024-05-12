import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MydatasRoutingModule } from './mydatas-routing.module';
import { MydatasComponent } from './mydatas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    MydatasComponent
  ],
  imports: [
    CommonModule,
    MydatasRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatLabel,
    MatSelectModule
  ]
})
export class MydatasModule { }
