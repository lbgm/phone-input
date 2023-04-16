import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneInputComponent } from './phone-input.component';
import { TypingDirective } from './typing.directive';



@NgModule({
  declarations: [
    PhoneInputComponent,
    TypingDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    PhoneInputComponent
  ],
  providers: [
    {
      provide: Window,
      useValue: window
    }
  ]
})
export class PhoneInputModule { }
