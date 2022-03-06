import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perca',
  templateUrl: './perca.component.html',
  styleUrls: ['./perca.component.scss']
})
export class PercaComponent implements OnInit {
//TODO: renomear para perda
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
