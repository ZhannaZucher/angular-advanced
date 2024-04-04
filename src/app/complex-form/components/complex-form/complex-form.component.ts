import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, map, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrl: './complex-form.component.scss',
})
export class ComplexFormComponent implements OnInit {
  mainForm!: FormGroup;
  personalInfoForm!: FormGroup;
  contactPreferenceCtrl!: FormControl;
  phoneCtrl!: FormControl;
  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;
  emailForm!: FormGroup;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  loginInfoForm!: FormGroup;

  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.InitFormObservables();
  }

  //private methods can not be called from template!
  private initMainForm(): void {
    this.mainForm = this.formBuilder.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceCtrl,
      email: this.emailForm,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm,
    });
  }

  private initFormControls(): void {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    this.contactPreferenceCtrl = this.formBuilder.control('email'); //email is default value here
    this.phoneCtrl = this.formBuilder.control('');
    this.emailCtrl = this.formBuilder.control('');
    this.confirmEmailCtrl = this.formBuilder.control('');
    this.emailForm = this.formBuilder.group({
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl,
    });
    this.passwordCtrl = this.formBuilder.control('', Validators.required);
    this.confirmPasswordCtrl = this.formBuilder.control(
      '',
      Validators.required
    );
    this.loginInfoForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl,
    });
  }

  //initializing observable values for email & phone input onChange input radio
  private InitFormObservables() {
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value), //starts with current preference input value and then reacts onChange
      map((preference) => (preference === 'email' ? true : false)),
      tap((showEmailCtrl) => this.setEmailValidators(showEmailCtrl))
    );

    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value), //starts with current preference input value and then reacts onChange
      map((preference) => (preference === 'phone' ? true : false)),
      tap((showPhoneCtrl) => this.setPhoneValidators(showPhoneCtrl))
    );
  }

  //handle validation for email inputs
  private setEmailValidators(showEmailCtrl: boolean): void {
    if (showEmailCtrl) {
      this.emailCtrl.addValidators([Validators.required, Validators.email]);
      this.confirmEmailCtrl.addValidators([
        Validators.required,
        Validators.email,
      ]);
    } else {
      this.emailCtrl.clearValidators();
      this.confirmEmailCtrl.clearValidators();
    }
    this.emailCtrl.updateValueAndValidity();
    this.confirmEmailCtrl.updateValueAndValidity();
  }

  //handle validation for phone inputs
  private setPhoneValidators(showPhoneCtrl: boolean): void {
    if (showPhoneCtrl) {
      this.phoneCtrl.addValidators([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]);
    } else {
      this.phoneCtrl.clearValidators();
    }
    this.phoneCtrl.updateValueAndValidity();
  }

  getFormControlErrorText(ctrl: AbstractControl): string {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('email')) {
      return "Merci d'entrer une addresse email valide";
    } else if (ctrl.hasError('minlength')) {
      return 'Ce numéro de téléphone ne contient pas assez de chiffres';
    } else if (ctrl.hasError('maxlength')) {
      return 'Ce numéro de téléphone contient trop de chiffres';
    } else {
      return 'Ce champ contient une erreur';
    }
  }

  onSubmitForm(): void {
    console.log(this.mainForm.value);
  }
}
