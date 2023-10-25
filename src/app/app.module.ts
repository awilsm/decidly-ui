import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TuiRootModule, TuiButtonModule } from '@taiga-ui/core';
import {TuiBlockStatusModule} from '@taiga-ui/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiInputModule
} from '@taiga-ui/kit';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TuiRootModule,
    TuiButtonModule,
    TuiBlockStatusModule,
    TuiInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
