import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatListModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatListModule,
    MatCardModule,
    MatIconModule
  ]
})
export class MaterialModule {}
