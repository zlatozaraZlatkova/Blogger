import { ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi;

  return (control) => {
    const valid = emailRegex.test(control.value);
    return valid ? null : { emailValidator: true };
  };
}
