import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import parsePhoneNumber, { PhoneNumber } from "libphonenumber-js";

import allCountries, { T_Country } from './all-countries';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

export { T_Country };

export type T_FormFieldControl = { [key: string]: AbstractControl; };

export interface PhoneDATA {
  country?: string;
  dialCode?: string | number;
  nationalNumber?: string | number;
  number?: string | number;
  isValid?: boolean;
}

export enum FormControlEvent {
  INVALID = 'INVALID',
  VALID = 'VALID'
}

@Component({
  selector: 'lbgm-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: [
    './tailwind.scss',
    './phone-input.component.scss',
  ]
})
export class PhoneInputComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() value?: string = "";
  @Input() label?: string = "";
  @Input() hasError?: boolean = false;
  @Input() hasSuccess?: boolean = false;
  @Input() placeholder?: string = ""
  @Input() name?: string = "lbgm-phone-input"
  @Input() required?: boolean = false;
  @Input() defaultCountry?: string = 'BJ';
  @Input() arrow?: boolean = true;
  @Input() listHeight?: number = 150;
  @Input() allowed?: string[] = (["BJ", "CI"]);

  @Input() group?: FormGroup;
  @Input() controls?: T_FormFieldControl;

  @ViewChild('basePhoneArrow') basePhoneArrow?: ElementRef;
  @ViewChild('inputBase') inputBase?: ElementRef;
  @ViewChild('icon', { static: true }) iconEl?: ElementRef;
  @ViewChild('selectPhone') selectPhone?: ElementRef;


  @Output() phoneEvent = new EventEmitter<string>(true);
  @Output() phoneData = new EventEmitter<PhoneDATA>(true);
  @Output() country = new EventEmitter<string>(true);


  hasIcon: boolean = false;
  countries: T_Country[] = allCountries;
  openSelect: boolean = false;
  defaultSelected!: T_Country;
  phone: string = "";
  popupPos: string = "bottom";
  focus: boolean = false;

  constructor(public el: ElementRef, private cd: ChangeDetectorRef) { }


  /**
   * TrackBy for *ngFor
   * @param index
   * @param item
   * @returns
   */
   trackByCountry(index: number, country: T_Country): number {
    return index;
    // you can also return item.X;
  }

  ngOnInit(): void {
    this.hasIcon = this.iconEl?.nativeElement?.innerHTML !== '';

    // initialize default country selected
    this.defaultSelected = this.formatPhoneInput(this.value as string);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //
    // watch changes on @Input() here
  }

  ngDoCheck() {
    // this.cd.markForCheck();
  }

  ngAfterViewInit(): void {
    this.emitAll();

    // outside
    document.addEventListener("click", (event) => {
      if (
        this.basePhoneArrow?.nativeElement &&
        !(this.basePhoneArrow?.nativeElement as HTMLElement).contains(event.target as Node)
      ) {
        this.openSelect = false;
      }
    });
  }


  /**
  * used to send custom Event: usable in case of scroll turning off when popup is under
  */
  cev_dash_select(): void {

    const event = new CustomEvent("CEV_SELECT_POPUP", {
      detail: { opened: this.openSelect, target: this.selectPhone?.nativeElement },
    });

    document.body.dispatchEvent(event);
  }

  /**
  * filt allowedCountries from props
  */
  get allowedCountries(): T_Country[] {
    const tbl: T_Country[] =
      (this.allowed as string[]).length !== 0
        ? this.countries.filter((o: T_Country) => (this.allowed as string[]).includes(o.iso2))
        : this.countries;
    return tbl;
  }

  get getGroup (): FormGroup {
    return this.group as FormGroup;
  }

  get getName (): string {
    return this.name as string;
  }

  get fieldError(): boolean {
    if(!this.controls) return this.hasError ?? false;
    const f = (this.controls as T_FormFieldControl)[this.name as string];
    return f.status === FormControlEvent.INVALID && f.touched && this.required as boolean;
  }

  get fieldSuccess(): boolean {
    if(!this.controls) return this.hasSuccess ?? false;
    const f = (this.controls as T_FormFieldControl)[this.name as string];
    return f.status === FormControlEvent.VALID && f.touched && this.required as boolean;
  }


  /**
  * ToggleSelect
  * to open countries list
  */
  toggleSelect(): void {
    this.openSelect = !this.openSelect;

    // calculate popup position: top or bottom
    const selectRect = this.selectPhone?.nativeElement.getBoundingClientRect();
    // y
    this.popupPos = selectRect.bottom < (this.listHeight as number) ? "top" : "bottom";
    //
    this.cev_dash_select();
  };


  /**
  * formatPhoneInput
  * used to format Phone Input
  * @param val
  */
  formatPhoneInput (val: string): T_Country {
    const phoneNumber: PhoneNumber | undefined = parsePhoneNumber(`+${val}`);
    if (phoneNumber) {
      this.phone = phoneNumber.nationalNumber;

      return {
        iso2: phoneNumber?.country as string,
        dialCode: phoneNumber?.countryCallingCode as string,
        name: this.countries.find((o: T_Country) => o.iso2 === phoneNumber?.country as string)?.name as string,
      };
    }
    // else
    return {
      ...this.countries.find((o: T_Country) => o.iso2 === this.defaultCountry) as T_Country,
    };
  };

  /**
  * emitPhone
  * used to emit phone in internationalFormat
  */
  emitPhone(): void {
    if (this.phone)
      this.phoneEvent.emit(`${this.defaultSelected.dialCode}${this.phone}`);
    else this.phoneEvent.emit("");
  };


  /**
  * emitPhoneData
  * Used to emit phoneData as an object
  * @returns {}
  */
  emitPhoneData(event?: Event): void {
    void event;
    const ph = parsePhoneNumber(
      `+${this.defaultSelected.dialCode}${this.phone}`
    );
    this.phoneData.emit({
      country: ph?.country,
      dialCode: ph?.countryCallingCode,
      nationalNumber: ph?.nationalNumber,
      number: ph?.number,
      isValid: ph?.isValid(),
    });
  };

  /**
  * emitAll
  * used to emit all event
  */
  emitAll(): void {
    this.country.emit(this.defaultSelected.iso2);
    this.emitPhone();
    this.emitPhoneData();
  }

  /**
  * to select any country
  * @param country
  */
  choose(country: T_Country) {
    this.defaultSelected = country;
    this.openSelect = false;
    this.emitAll();
  };


  /**
  * bind on input
  * @param event
  */
  onPhoneInput(event: Event): void {
    (event.target as HTMLInputElement).value = this.phone = String((event.target as HTMLInputElement).value).replace(
      /\D/g,
      ""
    );
    this.emitPhone();
  };


  @HostListener('mouseleave', ['$event'])
  @HostListener('mouseenter', ['$event'])
  focusOn(event: Event): void {
   switch (event.type) {
    case "mouseenter":
      this.focus = true;
    break;
    case "mouseleave":
      this.focus = false;
    break;
    default:
    break;
   }
  }

}
