import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './shared/app-routing.module';
import {AppComponent} from './app.component';
import {MaterialModule} from "./shared/material.module";
import {IconRegistryService} from "./service/icon-registry.service";
import {HttpClientModule} from "@angular/common/http";
import {HeaderModule} from "./components/header-module/header.module";
import {ProductListingModule} from "./components/product-listing/product-listing.module";
import {ShoppingCartService} from "./service/shopping-cart.service";
import {NgxMaskDirective, NgxMaskPipe} from "ngx-mask";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HeaderModule,
    HttpClientModule,
    ProductListingModule,
    NgxMaskDirective, NgxMaskPipe
  ],
  providers: [IconRegistryService, ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
