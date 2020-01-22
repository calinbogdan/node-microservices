import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material";
import { MatInputModule } from "@angular/material/input";
import { AdmittanceComponent } from './admittance.component';


@NgModule({
  declarations: [AdmittanceComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [AdmittanceComponent]
})
export class AdmittanceModule { }
