import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrl: './complex-form.component.scss',
})
export class ComplexFormComponent {
  mainForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  initMainForm(): void {
    this.mainForm = this.formBuilder.group({});
  }
}
