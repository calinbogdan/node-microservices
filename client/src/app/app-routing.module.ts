import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmittanceComponent } from './admittance/admittance.component';


const routes: Routes = [
  { path: 'admittance', component: AdmittanceComponent }
];

@NgModule({
  declarations: [
    AdmittanceComponent
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
