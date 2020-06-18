import { AbstractControl, ValidationErrors } from '@angular/forms';
  
export class MinDateValidator {
    static cannotLessNow(control: AbstractControl) : ValidationErrors | null {
        if(new Date((control.value as string)) < new Date()){
            return {cannotLessNow: true}
        }

        return null;
    }
}