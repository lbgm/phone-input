import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneInputComponent } from './phone-input.component';
import { TypingDirective } from '../typing.directive';



@NgModule({
  declarations: [
    PhoneInputComponent,
    TypingDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PhoneInputComponent
  ]
})
export class PhoneInputModule { }
