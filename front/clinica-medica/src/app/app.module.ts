import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from 'src/shared/shared.module';

import { ToastrModule } from 'ngx-toastr';
import { PagesModule } from './pages/pages.module';

import { PageGeralComponent } from './page-geral/page-geral.component';

@NgModule({
  declarations: [
    AppComponent,
    PageGeralComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    PagesModule,
    SharedModule,
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
