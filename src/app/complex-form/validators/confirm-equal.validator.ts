import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

//on passe les 2 Ctrl à comparer comme args
//AbstractCtrl ici sera le formGroup du coup et non un simple input
export function confirmEqualValidator(
  main: string,
  confirm: string
): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {
    //on check si on peut bien récupérer les 2 ctrl(inputs) pour vérifier
    if (!ctrl.get(main) || !ctrl.get(confirm)) {
      //si on peut pas on retourne erreur objet
      return {
        confirmEqual: 'Invalid control names',
      };
    }
    //on récupère les valeurs des inputs
    // !: dit à TS que l'input existe bien, on l'a vérifié plus haut
    const mainValue = ctrl.get(main)!.value;
    const confirmValue = ctrl.get(confirm)!.value;

    //on compare et s'ils ne sont pas égaux on retourne un objet d'erreur avec les valeurs des inputs dedans
    return mainValue === confirmValue
      ? null
      : {
          confirmEqual: {
            main: mainValue,
            confirm: confirmValue,
          },
        };
  };
}
