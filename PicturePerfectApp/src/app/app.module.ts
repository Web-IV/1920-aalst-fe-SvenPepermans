import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostModule } from './post/post.module';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PostModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
