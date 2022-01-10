import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patrimonio',
  templateUrl: './patrimonio.component.html',
  styleUrls: ['./patrimonio.component.scss']
})
export class PatrimonioComponent implements OnInit {

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
      dataCompra: ['', [Validators.required]],

    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

}
