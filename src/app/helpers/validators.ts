import { AbstractControl } from '@angular/forms';

export function integerValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const valid = /^\s*\d*\s*$/.test(control.value);
  return valid
    ? null
    : { invalidNumber: { valid: false, value: control.value } };
}
