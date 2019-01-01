import { AbstractControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AsYouType, isValidNumber } from 'libphonenumber-js';

@Injectable({
  providedIn: 'root'
})
export class FormHandlerService {
  constructor() {}

  static isPhone(number: string) {
    const usa = new RegExp(
      /^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    );
    const oneStart = new RegExp(/^1/);
    const phone = new AsYouType().input(number);
    if (oneStart.test(number) && usa.test(number)) {
      return `+${phone}`;
    }
    return usa.test(number) ? `+1${phone}` : phone;
  }

  areEqual(g: FormGroup) {
    const equal = g.value;
    const vals = Object.keys(equal).map(key => equal[key]);
    if (vals[0] !== vals[1]) {
      return { notEqual: true };
    } else {
      return null;
    }
  }

  emailValidator(c: AbstractControl) {
    const addy = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    const isEmail = addy.test(c.value);
    return isEmail ? null : { invalidEmail: true };
  }

  phoneValidator(c: AbstractControl) {
    const phone = FormHandlerService.isPhone(c.value);
    const isPhone = isValidNumber(phone);
    return isPhone ? null : { invalidPhone: true };
  }
}
