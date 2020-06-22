import { AbstractControl, ValidationErrors } from '@angular/forms';
  
export class MinDateValidator {
    static cannotLessNow(control: AbstractControl) : ValidationErrors | null {
        var start = new Date();
        start.setHours(0,0,0,0);
        start.setSeconds(start.getSeconds() - 1);
        var changed_date = new Date((control.value as string))
        if(changed_date <= start){
            return {cannotLessNow: true}
        }

        return null;
    }
}