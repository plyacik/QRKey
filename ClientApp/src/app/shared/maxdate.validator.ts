import { AbstractControl, ValidationErrors } from '@angular/forms';
  
export class MaxDateValidator {
    static cannotMore7Days(control: AbstractControl) : ValidationErrors | null {
        var today = new Date();
        today.setDate(today.getDate() + 7);
        if(new Date((control.value as string)) > today){
            return {cannotMore7Days: true}
        }
        return null;
    }
}