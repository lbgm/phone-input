# PhoneInput

An Angular phone input component module.
This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.0.

![PhoneInput screenshot](https://user-images.githubusercontent.com/92580505/232258765-222d4527-6317-4bc4-a799-70582e351eaf.png)

## Install

```sh
npm i @lbgm/phone-input
```

## Props & Types

```ts
export type T_FormFieldControl = { [key: string]: AbstractControl; };

export interface PhoneDATA {
  country?: string;
  dialCode?: string | number;
  nationalNumber?: string | number;
  number?: string | number;
  isValid?: boolean;
}

@Input() value?: string = ""; // like '22997000000'
@Input() label?: string = "";
@Input() hasError?: boolean = false;
@Input() hasSuccess?: boolean = false;
@Input() placeholder?: string = ""
@Input() name?: string = "lbgm-phone-input"
@Input() required?: boolean = false;
@Input() defaultCountry?: string = 'BJ';
@Input() arrow?: boolean = true; // to show or hide arrow
@Input() listHeight?: number = 150;
@Input() allowed?: string[] = ([]);

@Input() group?: FormGroup;
@Input() controls?: T_FormFieldControl;
```

- pass `value` on this format: `${dialCode}${nationalNumber}`
- `allowed` is an array of country iso2 (string).

## Slots

```html
<!-- add an element with attribute `arrow` to replace arrow icon. -->
<!-- ng-content code: -->
<ng-content select="[arrow]"></ng-content>


<!-- any slot -->
<!-- append content to component -->
<!-- add an element or a container with attribute `slot`-->
<!-- ng-content code: -->
<ng-content select="[slot]"></ng-content>
```

## Use

```ts
// app.module.ts

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PhoneInputModule } from '@lbgm/phone-input'; // here

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PhoneInputModule // here
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
```

```html
<!-- with FormBuilder, the component handle error automatically -->
<lbgm-phone-input
 [label]="'N° de téléphone'"
 [required]="true"
 [name]="'phone'"
 [group]="form"
 [controls]="form.controls"
 (phoneEvent)="input=$event"
 (phoneData)="inputData=$event"
 (country)="inputCountry=$event"
>
</lbgm-phone-input>


<!-- without FormBuilder -->
<lbgm-phone-input
 [label]="'N° de téléphone'"
 [required]="true"
 [name]="'phone'"
 (phoneEvent)="input=$event"
 (phoneData)="inputData=$event"
 (country)="inputCountry=$event"
>
</lbgm-phone-input>
```

- phoneEvent is string
- country is string
- phoneData is type [PhoneDATA](#props--types)

### Use with FormBuilder example

```ts
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PhoneDATA } from '@lbgm/phone-input';

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

  onSubmit(): void {
    this.form.markAllAsTouched();
  }
}
```

## Error on field

![Error case screenshot](https://user-images.githubusercontent.com/92580505/232258806-5453bde3-d92a-42ad-b226-30a45c6624be.png)

<!-- ## Code scaffolding

Run `ng generate component component-name --project phoneInput` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project phoneInput`.
> Note: Don't forget to add `--project phoneInput` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build phoneInput` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build phoneInput`, go to the dist folder `cd dist/phone-input` and run `npm publish`.

## Running unit tests

Run `ng test phoneInput` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
-->
