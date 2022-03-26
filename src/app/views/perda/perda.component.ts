import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perda',
  templateUrl: './perda.component.html',
  styleUrls: ['./perda.component.scss','../../../scss/style-base.scss']
})
export class PerdaComponent implements OnInit {
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
      codigoSetor: [],
      motivo: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(300)]],
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }
}
