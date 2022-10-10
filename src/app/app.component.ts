import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PhoneDATA } from './phone-input/phone-input.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'phone-input';
  form: any;
  input?: string = "";
  inputData?: PhoneDATA;
  inputCountry: string = "";


  constructor(private fb: FormBuilder) {
     this.form = fb.group({
      'phone': [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ]
     })
  }

  stringify (json: any) : string {
    return window.JSON.stringify(json);
  }

  onSubmit(): void {
    console.log({ formStatus: this.form.status })
  }
}
