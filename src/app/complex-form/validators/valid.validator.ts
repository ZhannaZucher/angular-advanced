import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validValidator(): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {
    if (ctrl.value.includes('VALID')) {
      return null; //le champ est valide
    } else {
      //si le champs n'est pas valide on retourne un objet avec l'erreur
      return {
        validValidator: ctrl.value,
      };
    }
  };
}
