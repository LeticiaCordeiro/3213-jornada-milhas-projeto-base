import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class FormValidations {
  static equalTo(otherFild: string): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      const fieldVlaue = control.value
      const otherFieldValue = control.root.get(otherFild)?.value

      if(fieldVlaue !== otherFieldValue){
        return {
          equalTo: true
        }
      }
      return null
    }
  }
}
