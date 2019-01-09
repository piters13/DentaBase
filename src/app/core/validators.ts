import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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
