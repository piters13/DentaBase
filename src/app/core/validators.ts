import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function makePeselValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const pesel = control.value;

    if ((typeof pesel === 'string' && pesel.length === 0) || pesel === null) {
      return null;
    }

    const reg = /^[0-9]{11}$/;

    if (reg.test(pesel) === false) {
      return { pesel: true };
    } else {
      const digits = ('' + pesel).split('');
      if (parseInt(pesel.substring(4, 6), 10) > 31 || parseInt(pesel.substring(2, 4), 10) > 12) {
        return { pesel: true };
      }

      let checksum =
        (parseInt(digits[0], 10) +
          3 * parseInt(digits[1], 10) +
          7 * parseInt(digits[2], 10) +
          9 * parseInt(digits[3], 10) +
          parseInt(digits[4], 10) +
          3 * parseInt(digits[5], 10) +
          7 * parseInt(digits[6], 10) +
          9 * parseInt(digits[7], 10) +
          parseInt(digits[8], 10) +
          3 * parseInt(digits[9], 10)) %
        10;
      if (checksum === 0) {
        checksum = 10;
      }
      checksum = 10 - checksum;

      if (parseInt(digits[10], 10) !== checksum) {
        return { pesel: true };
      }
    }

    return null;
  };
}

export function makeDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const date = control.value;

    if ((typeof date === 'string' && date.length === 0) || date === null) {
      return null;
    }

    const numbers = date.split('-');

    if (!numbers || numbers.length !== 3) {
      return { date: true };
    }

    const day = +numbers[2];
    const month = +numbers[1];
    const year = +numbers[0];

    if (
      day > 0 &&
      day < 32 &&
      month > 0 &&
      month < 13 &&
      year > new Date().getFullYear() - 150 &&
      year <= new Date().getFullYear()
    ) {
      return null;
    } else {
      return { date: true };
    }
  };
}

export function makeEqualToValidator(controlPath: Array<string | number> | string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const otherControl = control.root.get(controlPath);
    const expectedValue = otherControl ? otherControl.value : null;
    // tslint:disable-next-line:triple-equals
    return control.value == expectedValue
      ? null
      : { equalTo: { expected: expectedValue, actual: control.value } };
  };
}
