import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PhoneInputComponent } from './phone-input/phone-input.component';
import { TypingDirective } from './typing.directive';

@NgModule({
  declarations: [
    AppComponent,
    PhoneInputComponent,
    TypingDirective

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: Window,
      useValue: window
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
