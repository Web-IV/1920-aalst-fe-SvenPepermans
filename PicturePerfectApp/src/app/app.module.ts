import { httpInterceptorProviders } from './http-interceptors/index';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { UserModule } from './user/user.module';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, MainNavComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    LayoutModule,
    UserModule,
    AppRoutingModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
