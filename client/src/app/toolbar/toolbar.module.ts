import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule { }
