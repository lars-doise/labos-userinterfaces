import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OverzichtComponent} from "./overzicht/overzicht.component";
import {DetailsComponent} from "./details/details.component";
import {KeuzeschermComponent} from "./keuzescherm/keuzescherm.component";

const routes: Routes = [
  {path:'', component: OverzichtComponent},
  {path:'overzicht',component:OverzichtComponent},
  {path:'details/:id_als_string',component:DetailsComponent},
  {path:'keuze/:onderwerp',component:KeuzeschermComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
