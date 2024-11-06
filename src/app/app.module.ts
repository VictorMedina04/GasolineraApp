import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FilterPriceComponent } from './components/filter-price/filter-price.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import { provideHttpClient } from '@angular/common/http';
import { GasListComponent } from './components/gas-list/gas-list.component';
import { BannerComponent } from './shared/banner/banner.component';


@NgModule({
  declarations: [
    AppComponent,
    FilterPriceComponent,
    GasListComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


