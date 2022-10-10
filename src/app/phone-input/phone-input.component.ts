import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import parsePhoneNumber from "libphonenumber-js";

import allCountries from './all-countries';
import { FormControl, FormGroup } from '@angular/forms';

export interface AllowedCountries {
  name: string | number;
  iso2: string;
  dialCode: string | number,
}

export interface Country {
  name: string;
  dialoCode: string;
  iso2: string;
}

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
  styleUrls: ['./phone-input.component.scss']
})
export class PhoneInputComponent implements OnInit {

  @Input() value?: string = "";
  @Input() label?: string = "";
  @Input() hasError?: boolean = false;
  @Input() hasSuccess?: boolean = false;
  @Input() successMessage?: string = "";
  @Input() errorMessage?: string = "";
  @Input() placeholder?: string = ""
  @Input() name?: string = "lbgm-phone-input"
  @Input() required?: boolean = false;
  @Input() defaultCountry?: string = 'BJ';
  @Input() arrow?: boolean = true;
  @Input() listHeight: number = 150;
  @Input() allowed?: string[] =(["BJ", "CI"]);

  @Input() group?: FormGroup;
  @Input() controls?: FormControl;

  @ViewChild('basePhoneArrow') basePhoneArrow?: ElementRef;
  @ViewChild('inputBase') inputBase?: ElementRef;
  @ViewChild('icon', { static: true }) iconEl?: ElementRef;
  @ViewChild('selectPhone') selectPhone?: ElementRef;


  @Output() phoneEvent = new EventEmitter<string>(true);
  @Output() phoneData = new EventEmitter<PhoneDATA>(true);
  @Output() country = new EventEmitter<string>(true);


  hasIcon: boolean = false;
  countries: AllowedCountries[] = allCountries;
  openSelect: boolean = false;
  defaultSelected: Record<string, string> = ({});
  filterCountries?: string[] = [];
  phone: string = "";
  popupPos: string = "bottom";
  focus: boolean = false;

  constructor(public el: ElementRef) { }


  /**
   * TrackBy for *ngFor
   * @param index
   * @param item
   * @returns
   */
   trackByCountry(index: number, country: Country): number {
    return index;
    // you can also return item.X;
  }

  ngOnInit(): void {
    this.filterCountries = this.allowed;
    this.hasIcon = ((this.iconEl ?? ({}))?.nativeElement?.innerHTML ?? '').trim() !== '';

    // initialize default country selected
    this.defaultSelected = this.formatPhoneInput(this.value ?? '') as Record<any, any>;
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
  get allowedCountries(): Country[] {
    const tbl: any =
      Array.from(this.filterCountries ?? []).length !== 0
        ? this.countries.filter((o: { iso2: string; }) => Array.from(this.filterCountries ?? []).includes(o.iso2))
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
    const f = (this.controls as any)[this.name as string] ?? ({});
    return f.status === FormControlEvent.INVALID && f.touched && this.required;
  }

  get fieldSuccess(): boolean {
    if(!this.controls) return this.hasSuccess ?? false;
    const f = (this.controls as any)[this.name as string] ?? ({});
    return f.status === FormControlEvent.VALID && f.touched && this.required;
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
    this.popupPos = selectRect.bottom < this.listHeight ? "top" : "bottom";
  };


  /**
  * formatPhoneInput
  * used to format Phone Input
  * @param val
  */
  formatPhoneInput (val: string): Record<any, any> | undefined {
    const phoneNumber: any = parsePhoneNumber(`+${val}`);
    if (phoneNumber) {
      this.phone = phoneNumber.nationalNumber;

      return {
        iso2: phoneNumber.country,
        dialCode: phoneNumber.countryCallingCode,
        name: function () {
          return (
            Array.from(this.countries).find((o: any) => o.iso2 === this.iso2) as unknown as { name: string }
          ).name;
        },
      };
    }
    // else
    return {
      ...Array.from(this.countries).find((o: any) => o.iso2 === this.defaultCountry),
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
  emitPhoneData(event?: any): void {
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
  choose(country: Country) {
    this.defaultSelected = country as unknown as Record<string, string>;
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
