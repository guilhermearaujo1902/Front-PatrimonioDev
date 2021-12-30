import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  form = {} as FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validarCamposFormulario();
  }

  public validarCamposFormulario(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

}
