import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverzichtComponent } from './overzicht/overzicht.component';
import { OpsommingComponent } from './opsomming/opsomming.component';
import { DetailsComponent } from './details/details.component';
import {HttpClientModule} from "@angular/common/http";
import { SubcategorieenComponent } from './subcategorieen/subcategorieen.component';
import { KeuzeschermComponent } from './keuzescherm/keuzescherm.component';
import {NieuwsService} from "./data/nieuws.service";

@NgModule({
  declarations: [
    AppComponent,
    OverzichtComponent,
    OpsommingComponent,
    DetailsComponent,
    SubcategorieenComponent,
    KeuzeschermComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [NieuwsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
