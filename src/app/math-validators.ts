import { AbstractControl } from '@angular/forms';

export class MathValidators {
  static Sum(target: string, val1: string, val2: string) {
    return (form: AbstractControl) => {
      const sum = form.value[target];
      const num1 = form.value[val1];
      const num2 = form.value[val2];

      if (num1 + num2 === parseInt(sum)) {
        return null;
      }
      return { wrongSum: true };
    };
  }
  static Sub(target: string, val1: string, val2: string) {
    return (form: AbstractControl) => {
      const sum = form.value[target];
      const num1 = form.value[val1];
      const num2 = form.value[val2];

      if (num1 - num2 === parseInt(sum)) {
        return null;
      }
      return { wrongSub: true };
    };
  }
}
