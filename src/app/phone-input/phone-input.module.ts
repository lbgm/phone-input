import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneInputComponent } from './phone-input.component';



@NgModule({
  declarations: [
    PhoneInputComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PhoneInputComponent
  ]
})
export class PhoneInputModule { }
