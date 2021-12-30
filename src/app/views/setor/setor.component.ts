import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setor',
  templateUrl: './setor.component.html',
  styleUrls: ['./setor.component.scss']
})
export class SetorComponent implements OnInit {

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
      nomeSetor: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

}
