import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
//import { PhoneInputModule } from './phone-input/phone-input.module';
import { PhoneInputComponent } from './phone-input/phone-input.component';

@NgModule({
  declarations: [
    AppComponent,
    PhoneInputComponent
  ],
  imports: [
    BrowserModule,
    // PhoneInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
