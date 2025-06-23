import { ValidatorFn } from '@angular/forms';

export function strongPasswordValidator(): ValidatorFn {
  return (control) => {
    if (!control.value) return null;

    const password = control.value;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[#\?!@$%\^&*\-\.]/.test(password);
    const hasMinLength = password.length >= 8;

    const details = {
      hasUpper,
      hasLower,
      hasNumber,
      hasSymbol,
      hasMinLength
    };


    if (hasUpper && hasLower && hasNumber && hasSymbol && hasMinLength) {
      return null;
    }

    return { weakPassword: true, passwordDetails: details };
  };
}
