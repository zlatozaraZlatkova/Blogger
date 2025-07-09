import { ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  const emailRegex =
    /^[a-zA-Z0-9]([a-zA-Z0-9._-])*[a-zA-Z0-9]@[a-zA-Z0-9]([a-zA-Z0-9-])*[a-zA-Z0-9]\.([a-zA-Z]{2,4})$/;

  return (control) => {
    if (!control.value) {
      return null
    }

    const valid = emailRegex.test(control.value.trim());
    return valid ? null : { invalidEmail: true };
  };
}
