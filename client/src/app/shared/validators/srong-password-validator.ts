import { ValidatorFn } from '@angular/forms';

export function strongPasswordValidator(): ValidatorFn {
  return (control) => {
    if (!control.value) return null;

    const password = control.value;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[#?!@$%^&*\-.]/.test(password);
    const hasMinLength = password.length >= 8;

    if (hasUpper && hasLower && hasNumber && hasSpecial && hasMinLength) {
      return null;
    }

    return { weakPassword: true };
  };
}
