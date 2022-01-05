import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validacao();
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoEmpresa: [],
      nomeFantasia: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(70)]],
      cnpj: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
      razaoSocial: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(70)]],

    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }


}
