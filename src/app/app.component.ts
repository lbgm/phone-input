import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneDATA } from 'phone-input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'phone-input';
  form: FormGroup;
  input?: string = "";
  inputData?: PhoneDATA;
  inputCountry: string = "";


  constructor(private fb: FormBuilder) {
     this.form = this.fb.group({
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
    this.form.markAllAsTouched();
  }
}
