import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmittanceComponent } from './admittance/admittance.component';
import { AdmittanceModule } from './admittance/admittance.module';


const routes: Routes = [
  { path: 'admittance', component: AdmittanceComponent }
];

@NgModule({
  declarations: [],
  imports: [
    AdmittanceModule, 
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
