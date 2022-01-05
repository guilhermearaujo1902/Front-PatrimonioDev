import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-permissao',
  templateUrl: './permissao.component.html',
  styleUrls: ['./permissao.component.scss']
})
export class PermissaoComponent implements OnInit {

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
      codigoPermissao: [],
      descricaoPermissao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }


}
