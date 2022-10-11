# PhoneInput
An Angular phone input component module.
This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.0.

<img width="433" alt="image" src="https://user-images.githubusercontent.com/92580505/195067115-6f5bcaed-daef-4493-b95e-70a81639a9c1.png">

## Install
```sh
npm i @lbgm/phone-input
```
## Props and default values

```js
@Input() value?: string = "";
@Input() label?: string = "";
@Input() hasError?: boolean = false;
@Input() hasSuccess?: boolean = false;
@Input() placeholder?: string = ""
@Input() name?: string = "lbgm-phone-input"
@Input() required?: boolean = false;
@Input() defaultCountry?: string = 'BJ';
@Input() arrow?: boolean = true;
@Input() listHeight: number = 150;
@Input() allowed?: string[] =(["BJ", "CI"]);

@Input() group?: FormGroup;
@Input() controls?: FormControl;
```

## Slots

```html
<!-- add an element with attribute `arrow` for icon. -->
<!-- ng-content code: -->
<ng-content select="[arrow]"></ng-content>


<!-- any slot -->
<!-- append content to component -->
<!-- add an element or a container with attribute `slot`-->
<!-- ng-content code: -->
<ng-content select="[slot]"></ng-content>
```


## Use
```js
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
 class="max-w-[300px] mt-4"
 [arrow]="true"
 [label]="'N° de téléphone'"
 [required]="true"
 [allowed]="[]"
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
 class="max-w-[300px] mt-4"
 [arrow]="true"
 [label]="'N° de téléphone'"
 [required]="true"
 [allowed]="[]"
 [name]="'phone'"
 (phoneEvent)="input=$event"
 (phoneData)="inputData=$event"
 (country)="inputCountry=$event"
>
</lbgm-phone-input>
```

### Use with FormBuilder example:
```js
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PhoneDATA } from '@lbgm/phone-input';

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
    this.form.markAllAsTouched();
  }
}
```
```html
<!-- error on field -->
<img width="433" alt="image" src="https://user-images.githubusercontent.com/92580505/195069320-82476a00-8fa3-476b-bc42-e29c7b21f78a.png">
```


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
